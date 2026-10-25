#!/usr/bin/env bash
# beforeShellExecution — deny agent git add / commit / push.
# Payload JSON on stdin: { "command": "<shell command>", ... }
# Not a full shell parser; blocks common forms including git -C … and git -c ….

raw=$(cat)

result=$(
  printf '%s' "$raw" | python3 -c "
import json, re, sys

try:
    payload = json.load(sys.stdin)
except Exception:
    print(json.dumps({
        'permission': 'deny',
        'user_message': 'Git guard: invalid hook input.',
    }))
    raise SystemExit(0)

command = str(payload.get('command') or '')

blocked = re.compile(
    r'(?i)\bgit(?:\.exe)?\s+'
    r'(?:(?:-C\s+(?:\"[^\"]+\"|\'[^\']+\'|\S+)|-c\s+\S+|--no-pager)\s+)*'
    r'(?:add|commit|push)\b'
)

if blocked.search(command):
    print(json.dumps({
        'permission': 'deny',
        'user_message': (
            'Blocked: git add, git commit and git push must be run manually by the user.'
        ),
        'agent_message': (
            'Git write operations are blocked by policy. '
            'Do not retry using another shell syntax. '
            'Ask the user to perform the operation manually.'
        ),
    }))
else:
    print(json.dumps({'permission': 'allow'}))
"
) || result='{"permission":"deny","user_message":"Git guard: hook failed.","agent_message":"Git guard script failed. Do not retry."}'

printf '%s\n' "$result"
exit 0
