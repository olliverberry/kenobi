#!/bin/bash

# create a feature flag
# this is a script to create a feature flag in LaunchDarkly which is used to control the visibility of the alerts modal

LD_PROJECT_KEY=${1:-default}

echo "Creating feature flag in project $LD_PROJECT_KEY"
data='{"key": "hasAlertsModal", "name": "Has Alerts Modal", "description": "Whether the user has the alerts modal", "type": "boolean", "default": false, "clientSideAvailability": {"usingEnvironmentId": true}}'

ldcli flags \
    create \
    --project "$LD_PROJECT_KEY" \
    --data "$data"