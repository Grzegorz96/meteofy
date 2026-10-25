#!/usr/bin/env bash
# afterFileEdit — format the single edited file (Cursor docs style).
# Payload JSON on stdin: { "file_path": "<absolute path>", ... }

if command -v jq >/dev/null 2>&1; then
  file=$(jq -r '.file_path // empty')
else
  # jq is optional; python3 is available in this environment
  file=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("file_path") or "")')
fi

[[ -z "$file" || ! -f "$file" ]] && exit 0

case "$file" in
  */node_modules/*|*/dist/*|*/dist-ssr/*|*/.vite/*) exit 0 ;;
esac

case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs) ;;
  *) exit 0 ;;
esac

# Resolve bins from this script's repo root (not from cwd)
root="$(cd "$(dirname "$0")/../.." && pwd)"

# ESLint flat config lives per workspace — run from that package, not monorepo root
eslint_cwd=""
eslint_file=""
case "$file" in
  "$root"/apps/web/*)
    eslint_cwd="$root/apps/web"
    eslint_file="${file#"$root"/apps/web/}"
    ;;
  "$root"/apps/api/*)
    eslint_cwd="$root/apps/api"
    eslint_file="${file#"$root"/apps/api/}"
    ;;
  "$root"/packages/shared/*)
    eslint_cwd="$root/packages/shared"
    eslint_file="${file#"$root"/packages/shared/}"
    ;;
esac

# eslint --fix then prettier (eslint-config-prettier — no plugin-prettier double-run)
if [[ -n "$eslint_cwd" ]]; then
  (cd "$eslint_cwd" && "$root/node_modules/.bin/eslint" --fix --no-warn-ignored "$eslint_file") >/dev/null 2>&1 || true
fi
"$root/node_modules/.bin/prettier" --write "$file" >/dev/null 2>&1 || true
exit 0
