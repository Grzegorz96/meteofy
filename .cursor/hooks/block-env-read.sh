#!/usr/bin/env bash
# beforeShellExecution — deny shell commands that reference secret .env files.
# Allows .env.example / .env.sample / .env.template / .env.dist.
# Also blocks globs that can expand to those files (e.g. cat .e*).
# Payload JSON on stdin: { "command": "<shell command>", ... }

raw=$(cat)

result=$(
  printf '%s' "$raw" | python3 -c '
import fnmatch
import json
import re
import sys

try:
    payload = json.load(sys.stdin)
except Exception:
    print(json.dumps({
        "permission": "deny",
        "user_message": "Env guard: invalid hook input.",
        "agent_message": "Cannot verify command safety. Do not retry the read.",
    }))
    raise SystemExit(0)

command = str(payload.get("command") or "")

# Token-bounded .env / .envrc / .env.* — not process.env, process\.env, or .environment
env_ref = re.compile(
    r"(?<![\w.\\-])\.env(?:rc)?(?:\.[\w-]+)*(?![\w-])",
    re.IGNORECASE,
)
SAFE = {".env.example", ".env.sample", ".env.template", ".env.dist"}
GLOB_TARGETS = (".env", ".env.local", ".envrc")


def references_secret_env(text: str) -> bool:
    for m in env_ref.finditer(text):
        if m.group(0).lower() not in SAFE:
            return True
    for tok in re.split(r"[\s;|&<>(){}`\"\x27=,]+", text):
        if not any(c in tok for c in "*?["):
            continue
        # Match both bare (.e*) and nested (apps/api/.e*) glob patterns
        base = re.split(r"[/\\\\]", tok)[-1]
        patterns = {tok, base}
        if any(
            fnmatch.fnmatch(name, pat)
            for pat in patterns
            for name in GLOB_TARGETS
        ):
            return True
    return False


if references_secret_env(command):
    print(json.dumps({
        "permission": "deny",
        "user_message": "Blocked: terminal commands referencing .env files are not allowed.",
        "agent_message": (
            "Reading .env files is prohibited. "
            "Do not retry using another command or shell syntax. "
            "Continue the task without accessing environment files. "
            ".env.example (and .sample/.template/.dist) are allowed if you only need variable names."
        ),
    }))
else:
    print(json.dumps({"permission": "allow"}))
'
) || result='{"permission":"deny","user_message":"Env guard failed.","agent_message":"The safety check failed. Do not retry the command."}'

printf '%s\n' "$result"
exit 0
