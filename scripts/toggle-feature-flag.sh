LD_PROJECT_KEY=${1:-default}
LD_ENVIRONMENT_ID=${2:-production}
LD_FLAG_KEY=${3:-hasAlertsModal}
LD_FLAG_VALUE=${4:-true}

echo "Toggling feature flag "$LD_FLAG_KEY" to "$LD_FLAG_VALUE" in project "$LD_PROJECT_KEY" for environment "$LD_ENVIRONMENT_ID""
if [ "$LD_FLAG_VALUE" = "true" ]; then
    ldcli flags \
        toggle-on \
        --project "$LD_PROJECT_KEY" \
        --flag "$LD_FLAG_KEY" \
        --environment "$LD_ENVIRONMENT_ID"
else
    ldcli flags \
        toggle-off \
        --project "$LD_PROJECT_KEY" \
        --flag "$LD_FLAG_KEY" \
        --environment "$LD_ENVIRONMENT_ID"
fi