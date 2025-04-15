APPID=@REPLACE_WITH_APPID

PROCESS_NAME=$APPID--api


# note : pm2 pid "$PROCESS_NAME" gives empty line as response if the process is not running
PID=$(pm2 pid "$PROCESS_NAME" | tr -d '[:space:]')  # Remove empty lines and spaces

if [[ -n "$PID" ]] >/dev/null; then
    echo "Process '$PROCESS_NAME' exists. Restarting..."
    pm2 restart "$PROCESS_NAME"
else
    echo "Process '$PROCESS_NAME' not found. Starting..."
    pm2 start "bash -c 'pnpm run dev'" --name $PROCESS_NAME
fi



