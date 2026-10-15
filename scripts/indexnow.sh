#!/usr/bin/env bash
# Tell Bing (and Yandex, Seznam, Naver) about new or updated pages via IndexNow.
# Usage: bash scripts/indexnow.sh /blog/some-slug /schools/other-slug
# With no arguments it submits the festive guides and the pages that link to them.
# The key file public/9e6fbc66da73b2a408e44f2e228ef7ef.txt must stay deployed for this to work.
set -euo pipefail
HOST="www.bkkfamilies.com"
KEY="9e6fbc66da73b2a408e44f2e228ef7ef"
if [ $# -eq 0 ]; then
  set -- /blog/christmas-in-bangkok-with-kids /blog/new-years-eve-in-bangkok-with-kids /blog/halloween-in-bangkok-with-kids /school-breaks /blog/9-things-to-do-in-bangkok-with-kids
fi
URLS=$(printf '"https://%s%s",' $(for p in "$@"; do echo "$HOST $p"; done) | sed 's/,$//')
curl -sS -o /dev/null -w "IndexNow response: %{http_code} (200 or 202 means accepted)\n" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":[$URLS]}"
