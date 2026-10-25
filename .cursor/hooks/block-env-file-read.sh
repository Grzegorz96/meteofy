#!/usr/bin/env bash
# beforeReadFile / beforeTabFileRead — deny agent/Tab Read of secret .env files.
# Allows .env.example / .env.sample / .env.template / .env.dist.
# Do not log stdin: payload may include file content.
# Payload: { "file_path": "...", "content": "...", "attachments": [{ "file_path": "..." }, ...] }

raw=$(cat)

result=$(
  printf '%s' "$raw" | python3 -c '
import json
import re
import sys

try:
    payload = json.load(sys.stdin)
except Exception:
    print(json.dumps({
        "permission": "deny",
        "user_message": "Env guard: invalid file-read hook input.",
    }))
    raise SystemExit(0)

# .env, .envrc, .env.local, .env.development.local, .env.local.bak, …
blocked_re = re.compile(
    r"(?:^|[/\\\\])\.env(?:rc|\.[^/\\\\]+)?$",
    re.IGNORECASE,
)
safe_re = re.compile(
    r"(?:^|[/\\\\])\.env\.(?:example|sample|template|dist)$",
    re.IGNORECASE,
)


def is_secret_env_path(path: str) -> bool:
    if not path:
        return False
    return bool(blocked_re.search(path) and not safe_re.search(path))


paths = [str(payload.get("file_path") or "")]
for att in payload.get("attachments") or []:
    if isinstance(att, dict):
        paths.append(str(att.get("file_path") or ""))

if any(is_secret_env_path(p) for p in paths):
    print(json.dumps({
        "permission": "deny",
        "user_message": "Blocked: environment files are protected.",
    }))
else:
    print(json.dumps({"permission": "allow"}))
'
) || result='{"permission":"deny","user_message":"Env guard failed."}'

printf '%s\n' "$result"
exit 0
