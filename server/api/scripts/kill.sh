APPID=@REPLACE_WITH_APPID

PROCESS_NAME=$APPID--api


# note : pm2 pid "$PROCESS_NAME" gives empty line as response if the process is not running
PID=$(pm2 pid "$PROCESS_NAME" | tr -d '[:space:]')  # Remove empty lines and spaces

if [[ -n "$PID" ]] >/dev/null; then
    echo "Process '$PROCESS_NAME' exists. Deleting..."
    pm2 delete "$PROCESS_NAME"
else
    echo "Process '$PROCESS_NAME' not found. Skipping..."
fi



