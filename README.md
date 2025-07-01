# Kenobi - Semgrep POV Management Platform

A comprehensive dashboard for tracking health metrics and forecasting contributors for Semgrep Proof of Value (POV) deployments. This platform includes feature flag management with LaunchDarkly and real-time analytics tracking.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- LaunchDarkly account with API access
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kenobi
```

### 2. LaunchDarkly Setup

Before running the project, you need to set up LaunchDarkly:

1. **Create a new LaunchDarkly project** in your LaunchDarkly dashboard
2. **Generate an API key** with write access:
   - Go to Account Settings → API Keys
   - Create a new API key with "Write" permissions
   - Store this key securely for later use

3. **Create the feature flag** using the provided script:
   ```bash
   ./scripts/create-feature-flag.sh <YOUR_API_KEY> <YOUR_PROJECT_KEY>
   ```

### 3. Environment Configuration

1. **Copy the example environment file**:
   ```bash
   cp frontend/example.env.docker frontend/.env.docker
   ```

2. **Generate an auth secret**:
   ```bash
   chmod +x scripts/generate-auth-token.sh
   ./scripts/generate-auth-token.sh
   ```

3. **Update the environment variables** in `frontend/.env.docker`:
   ```bash
   # Replace placeholder values with your actual LaunchDarkly credentials
   LD_SERVER_SDK_SECRET="your_server_sdk_secret"
   NEXT_PUBLIC_LD_CLIENT_SDK_ID="your_client_sdk_id"
   ENV_PORT=3000
   AUTH_SECRET="your_auth_secret"
   AUTH_TRUST_HOST=true
   AUTH_URL=http://localhost:3000
   BACKEND_URL=http://server:3000
   ```



### 4. Run the Application

Start the application using Docker Compose:

```bash
NEXT_PUBLIC_LD_CLIENT_SDK_ID="your_client_sdk_id" docker compose up --force-recreate --build -d
```

**Important**: The `NEXT_PUBLIC_LD_CLIENT_SDK_ID` must be provided during the build process for Next.js to properly configure the LaunchDarkly client.

### 5. Access the Application

- **Frontend**: http://localhost:3000

## 🔐 Authentication

The application comes with pre-configured test users. **Passwords are not validated** - you can use any password with the following email addresses:

### Available Test Users

| Email | First Name | Last Name | Business Unit | Title |
|-------|------------|-----------|---------------|-------|
| `john@example.com` | John | Doe | sales | Sales Manager |
| `maria@example.com` | Maria | Smith | engineering | Software Engineer |
| `jane@example.com` | Jane | Doe | engineering | Software Engineer |
| `stuart.mehrens@gmail.com` | Stuart | Mehrens | sales-engineering | Senior Sales Engineer |

## 🚩 LaunchDarkly Feature Flags

### hasAlertsModal Flag

This feature flag controls the visibility of the "Setup Alerts" button on the main dashboard.

#### Managing the Flag

**Turn the flag ON:**
```bash
./scripts/toggle-feature-flag.sh <API_KEY> <PROJECT_KEY> <ENVIRONMENT_ID> true
```

**Turn the flag OFF:**
```bash
./scripts/toggle-feature-flag.sh <API_KEY> <PROJECT_KEY> <ENVIRONMENT_ID> false
```

#### Creating Experiments

1. In your LaunchDarkly dashboard, go to "Experiments"
2. Create a new experiment using the `setup-alerts-button-clicked` event
3. Configure targeting rules based on user context (email, business unit, etc.)
4. Set up conversion goals and analysis

### User Context & Targeting

The application automatically creates LaunchDarkly user contexts with the following attributes:
- `userId`: Unique user identifier
- `email`: User's email address
- `firstName`: User's first name
- `lastName`: User's last name
- `businessUnit`: User's business unit (sales, engineering, sales-engineering)
- `title`: User's job title

This context enables targeted feature flag rules and experiment targeting based on user attributes.

## 📊 Analytics & Metrics

### Tracked Events

- **`setup-alerts-button-clicked`**: Fired when users click the "Setup Alerts" button
  - Automatically includes user context
  - Can be used to create custom metrics and experiments

### Creating Custom Metrics

1. In LaunchDarkly, go to "Metrics"
2. Create a new custom metric using the `setup-alerts-button-clicked` event
3. Configure aggregation and time windows as needed
4. Use the metric in experiments and dashboards

## 🏗️ Project Structure

```
kenobi/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages and API routes
│   ├── components/          # React components
│   ├── lib/                 # Utility libraries
│   └── hooks/               # Custom React hooks
├── server/                  # NestJS backend API
│   └── src/                 # Source code
├── scripts/                 # Utility scripts
│   ├── create-feature-flag.sh
│   ├── toggle-feature-flag.sh
│   └── generate-auth-token.sh
└── docker-compose.yaml      # Docker orchestration
```

### Logs

View application logs:
```bash
# All services
docker compose logs

# Specific service
docker compose logs frontend
docker compose logs server
```