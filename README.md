<p align="center">
  <a href="https://scalekit.com" target="_blank" rel="noopener noreferrer">
    <picture>
      <img src="https://cdn.scalekit.cloud/v1/scalekit-logo-dark.svg" height="64">
    </picture>
  </a>
</p>

<h1 align="center">
  AWS Cognito + Scalekit SSO Integration
</h1>

<p align="center">
  <strong>Auth stack for AI apps ⚡ Enterprise SSO with AWS</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@scalekit-sdk/node"><img src="https://img.shields.io/npm/v/@scalekit-sdk/node.svg" alt="npm version"></a>
  <a href="https://github.com/scalekit-inc/scalekit-cognito-sso/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://docs.scalekit.com/integrations/aws-cognito"><img src="https://img.shields.io/badge/docs-AWS%20Integration-blue" alt="AWS Integration Guide"></a>
</p>

<p align="center">
  Next.js application demonstrating enterprise SSO by bridging AWS Cognito with Scalekit using OIDC
</p>

## 🚀 What This Demo Shows

- **AWS Cognito Integration**: Seamless federation with existing Cognito User Pools
- **Enterprise SSO Bridge**: Connect Scalekit identity providers to AWS infrastructure  
- **OIDC Protocol**: Standards-based authentication flow between services
- **Secure Session Management**: Iron Session for encrypted cookie-based sessions
- **Production Patterns**: Error handling, logout flows, and security best practices

## Features

- AWS Cognito authentication
- Enterprise SSO via Scalekit integration
- Secure session management with Iron Session
- User profile information display
- Protected routes with middleware
- Responsive UI with Tailwind CSS

## Authentication Flow

1. User visits the application and clicks login
2. User is redirected to AWS Cognito
3. If using enterprise email, user is forwarded to Scalekit IdP router
4. User authenticates with their organization's identity provider
5. User is redirected back to the application with authentication tokens
6. Application verifies tokens and creates a session
7. For logout, the application clears the session and redirects to Cognito's logout endpoint, which then returns to the app's home page

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- AWS Account with Cognito User Pool
- Scalekit account (for enterprise SSO)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saif-at-scalekit/cognito-scalekit.git
cd cognito-scalekit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory with the following variables:

```bash
COGNITO_CLIENT_ID=your_cognito_client_id
COGNITO_CLIENT_SECRET=your_cognito_client_secret
COGNITO_DOMAIN=your_cognito_domain_prefix
AWS_REGION=your_aws_region
REDIRECT_URI=http://localhost:3000/auth/callback
SESSION_SECRET=your_session_secret_at_least_32_chars_long
```

### 4. Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Configuring AWS Cognito with Scalekit

### 1. Set up AWS Cognito User Pool

1. Create or use an existing User Pool in AWS Cognito
2. Configure app client settings with the following:
   - Allowed OAuth flows: Authorization code grant
   - Allowed OAuth scopes: email, openid, phone
   - Callback URL: http://localhost:3000/auth/callback (for development)
   - Sign out URL: http://localhost:3000/ (for development)

### 2. Add Scalekit as an OIDC Provider

1. In AWS Cognito Dashboard, go to **User Pool Properties**
2. Under **Federation > Identity providers**, click **Add identity provider**
3. Select **OpenID Connect**
4. Configure the provider with these settings:

| Field                     | Value                                 |
| ------------------------- | ------------------------------------- |
| Provider name             | ScalekitOIDC123 (or your chosen name) |
| Client ID                 | From Scalekit Dashboard               |
| Client secret             | From Scalekit Dashboard               |
| Attributes request method | GET                                   |
| Scopes                    | openid email phone                    |
| Issuer URL                | Your Scalekit issuer URL              |

5. Under **Attribute mapping**, map the essential attributes:
   - email → email
   - sub → sub (unique identifier)

## Understanding the Code

### Authentication Routes

- `/auth/login`: Initiates the login process and redirects to Cognito
- `/auth/callback`: Handles the OAuth callback and sets up the session
- `/auth/logout`: Logs the user out by clearing the session data and redirecting to Cognito's logout endpoint using the format:
  ```
  https://{domain}.auth.{region}.amazoncognito.com/logout?client_id={client_id}&logout_uri={redirect_uri}
  ```

### Session Management

This application uses Iron Session for secure, encrypted cookie-based sessions.

### Key Components

- `lib/auth.ts`: OpenID Client configuration
- `lib/session.ts`: Session management
- `middleware.ts`: Protection for authenticated routes
- `app/page.tsx`: Home page with conditional rendering based on auth state
- `app/dashboard/page.tsx`: Protected route showing user information

## Testing with Scalekit IdP Simulator

For development purposes, you can test the enterprise SSO flow using Scalekit's IdP Simulator:

1. Use an email address with domain `@example.org` or `@example.com`
2. When redirected, you will see the Scalekit IdP Simulator
3. Enter any credentials to simulate a successful login

## Production Considerations

Before deploying to production:

1. Update the environment variables with production values
2. Configure proper callback and sign-out URLs in AWS Cognito
3. Increase the security of the session by setting appropriate cookie options
4. Implement logging and error monitoring
5. Consider rotating client secrets quarterly

## Security Recommendations

- Store secrets in environment variables or a secure vault
- Validate `state` and `nonce` parameters to prevent CSRF attacks
- Enable HTTPS in production
- Regularly update dependencies to patch security vulnerabilities
- Implement proper error handling and logging
- Ensure proper session cleanup during logout (both client-side and with Cognito)

## Key Integration Benefits

- **Leverage Existing Infrastructure**: Keep using AWS Cognito while adding enterprise SSO
- **Zero Migration**: No need to migrate existing user pools or applications  
- **Enterprise Grade**: SAML/OIDC support for major identity providers
- **Compliance Ready**: SOC2, GDPR, and enterprise security standards
- **Scalable Architecture**: Handle thousands of enterprise organizations

## Additional Resources

- 📚 [AWS Cognito Integration Guide](https://docs.scalekit.com/integrations/aws-cognito)
- 🔧 [Scalekit API Reference](https://docs.scalekit.com/apis)
- 💬 [Community Support](https://github.com/scalekit-inc/scalekit-sdk-node-js/discussions)
- 🎯 [Get Started Guide](https://docs.scalekit.com/quick-start-guide)
- ⚡ [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- 🔗 [OpenID Connect Specification](https://openid.net/connect/)

---

<p align="center">
  Made with ❤️ by <a href="https://scalekit.com">Scalekit</a>
</p>
