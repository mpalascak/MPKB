#!/bin/zsh

SCRIPT_DIR="${0:A:h}"
PORT="4173"
URL="http://127.0.0.1:${PORT}"

cd "$SCRIPT_DIR" || exit 1

if ! command -v npm >/dev/null 2>&1; then
  echo "MP Knowledge Base potřebuje Node.js a npm."
  echo "Stiskni Enter pro ukončení."
  read
  exit 1
fi

if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
  echo "Při prvním spuštění instaluji závislosti aplikace."
  npm install || exit 1
fi

echo "Spouštím MP Knowledge Base na ${URL}"
echo "Toto okno ponech otevřené. Aplikaci ukončíš klávesami Ctrl+C."
npm run dev -- --hostname 127.0.0.1 --port "$PORT" &
SERVER_PID=$!

trap 'kill "$SERVER_PID" 2>/dev/null' EXIT INT TERM
sleep 2
open "$URL"
wait "$SERVER_PID"
