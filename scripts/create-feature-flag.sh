#!/bin/bash

# create a feature flag
# this is a script to create a feature flag in LaunchDarkly which is used to control the visibility of the alerts modal

LD_API_KEY=${1}
LD_PROJECT_KEY=${2}


if [ -z "$LD_PROJECT_KEY" ] || [ -z "$LD_API_KEY" ]; then
    echo "Usage: $0 <LD_API_KEY> <LD_PROJECT_KEY>"
    exit 1
fi

echo "Creating feature flag in project $LD_PROJECT_KEY"
data='{"key": "hasAlertsModal", "name": "Has Alerts Modal", "description": "Whether the user has the alerts modal", "type": "boolean", "default": false, "clientSideAvailability": {"usingEnvironmentId": true}}'

curl -s -X POST \
    -H "Authorization: $LD_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$data" "https://app.launchdarkly.com/api/v2/flags/$LD_PROJECT_KEY"