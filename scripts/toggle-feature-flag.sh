#!/bin/bash
LD_API_KEY=${1}
LD_PROJECT_KEY=${2}
LD_ENVIRONMENT_ID=${3}
LD_FLAG_VALUE=${4}
LD_FLAG_KEY="hasAlertsModal"

if [ -z "$LD_API_KEY" ] || [ -z "$LD_PROJECT_KEY" ] || [ -z "$LD_ENVIRONMENT_ID" ] || [ -z "$LD_FLAG_VALUE" ]; then
    echo "Usage: $0 <LD_API_KEY> <LD_PROJECT_KEY> <LD_ENVIRONMENT_ID> <LD_FLAG_VALUE>"
    exit 1
fi

echo "Toggling feature flag "$LD_FLAG_KEY" to "$LD_FLAG_VALUE" in project "$LD_PROJECT_KEY" for environment "$LD_ENVIRONMENT_ID""
if [ "$LD_FLAG_VALUE" = "true" ]; then
    curl -s -X PATCH \
        -H "Authorization: $LD_API_KEY" \
        -H "Content-Type: application/json; domain-model=launchdarkly.semanticpatch" \
        -d "{\"environmentKey\": \"$LD_ENVIRONMENT_ID\", \"instructions\": [{\"kind\": \"turnFlagOn\"}]}" \
        "https://app.launchdarkly.com/api/v2/flags/$LD_PROJECT_KEY/$LD_FLAG_KEY"
else
    curl -s -X PATCH \
        -H "Authorization: $LD_API_KEY" \
        -H "Content-Type: application/json; domain-model=launchdarkly.semanticpatch" \
        -d "{\"environmentKey\": \"$LD_ENVIRONMENT_ID\", \"instructions\": [{\"kind\": \"turnFlagOff\"}]}" \
        "https://app.launchdarkly.com/api/v2/flags/$LD_PROJECT_KEY/$LD_FLAG_KEY"
fi