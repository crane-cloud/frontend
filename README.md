# CraneCloud Frontend

Cloud management platform frontend built with:

- React + TypeScript - Core framework with type-safe development
- Mantine UI framework - Modern component library with theming support
- Vite build system - Fast development tooling with HMR and optimized production builds
- Kubernetes deployment workflows - Cloud-native CI/CD pipelines and cluster management

**Platform Capabilities:**
A modern web interface for managing cloud infrastructure across multiple providers. Provides real-time visibility into resource utilization, automated deployment pipelines, and secure access controls. Designed for scalability with dynamic dashboard configurations and API-driven architecture.

## Key Features

- Multi-cluster resource management
- Real-time monitoring dashboards
- Service deployment workflows
- User authentication and activity logging
- Payment integration (Flutterwave)
- Multi-environment configuration (Staging/Production)

## Development Setup

### Core Scripts

- `dev` – Start Vite development server
- `build` – Production build
- `preview` – Preview production build locally
- `storybook` – Launch component storybook

### Testing & Quality

- `test` – Run full test suite (Vitest + typecheck + lint)
- `vitest:watch` – Interactive test watcher
- `lint` – Run ESLint and Stylelint
- `prettier:write` – Format codebase

## Testing Stack

- Vitest + React Testing Library
- Storybook for component development
- ESLint + Prettier code quality
- TypeScript type checking
- GitHub Actions CI/CD pipelines

## Documentation

- [Component Library](http://storybook.cranecloud.io)
- [API Documentation](https://api.cranecloud.io/apidocs/#)
- [Documentation](https://docs.cranecloud.io)
