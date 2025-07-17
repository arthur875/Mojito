#!/bin/bash

# Path to the log file for this watchdog script
LOG_FILE="/home/pika/.pm2/logs/vpn_watchdog.log"

# The name of your bot process as it appears in `pm2 list`
BOT_NAME="Mojito" 

# The URL for the bot's health check endpoint
HEALTH_CHECK_URL="http://localhost:8080"
# The expected response from the health check endpoint
EXPECTED_RESPONSE="I'm alive :D"

# Function to log messages with a timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_message "VPN Watchdog started with health check on $HEALTH_CHECK_URL."

while true; do
    log_message "Checking bot health via $HEALTH_CHECK_URL..."

    HEALTH_CHECK_OUTPUT=$(curl -s --connect-timeout 5 "$HEALTH_CHECK_URL")
    CURL_EXIT_CODE=$? # Get the exit code of the last command (curl)

    BOT_HEALTHY=false

    if [ "$CURL_EXIT_CODE" -eq 0 ]; then
        # Curl succeeded, now check the content of the response
        if echo "$HEALTH_CHECK_OUTPUT" | grep -q "$EXPECTED_RESPONSE"; then
            BOT_HEALTHY=true
            log_message "Bot health check successful. Response: '$HEALTH_CHECK_OUTPUT'."
        else
            log_message "Bot health check failed: Unexpected response from $HEALTH_CHECK_URL. Response: '$HEALTH_CHECK_OUTPUT'."
        fi
    else
        log_message "Bot health check failed: Curl exited with code $CURL_EXIT_CODE. Cannot connect to $HEALTH_CHECK_URL."

    fi

    if [ "$BOT_HEALTHY" = false ]; then
        log_message "Bot is unhealthy. Attempting VPN and bot restart."

        # Disconnect ExpressVPN
        log_message "Disconnecting ExpressVPN..."
        expressvpnctl disconnect >> "$LOG_FILE" 2>&1
        sleep 5

        # Connect ExpressVPN to a smart location
        log_message "Connecting ExpressVPN to smart location..."
        expressvpnctl connect smart >> "$LOG_FILE" 2>&1
        sleep 10

        # Restart the bot using PM2
        log_message "Restarting '$BOT_NAME' via PM2..."
        pm2 restart "$BOT_NAME" >> "$LOG_FILE" 2>&1
        log_message "Restart command issued for '$BOT_NAME'."
    else
        log_message "'$BOT_NAME' is healthy. VPN connection appears stable."
    fi

    # Wait for 1 minute before checking again
    sleep 60
done

