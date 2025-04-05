# OmniAgent

A demonstration of a single agent interface that coordinates with multiple specialized agents behind the scenes.

## Features

- Single interface to communicate with multiple specialized AI agents
- Demonstration of agent coordination and orchestration
- Interactive visualization of agent interactions
- Three agent types (Quality, FLKH, and Omni)

## Tech Stack

- Next.js 15
- React 19
- TailwindCSS
- TypeScript

## Getting Started

### Development Environment

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Deployment

```bash
# Build the Docker image
docker build -t omniagent .

# Run the container
docker run -p 3000:3000 omniagent
```

Access the application at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `/app` - Next.js app directory with the main pages
- `/components` - React components used throughout the application
- `/public` - Static assets
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared code
- `/styles` - Global CSS and style definitions 