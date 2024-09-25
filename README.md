# eCommerce API

This project is a Node.js Express-based API for an eCommerce platform.

## Features

- RESTful API endpoints for eCommerce operations
- PostgreSQL database integration
- JWT authentication
- Swagger API documentation
- Docker support for easy development and deployment

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## Getting Started

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables by copying the `.env.example` file to `.env` and updating the values:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Using Docker

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

The API will be available at `http://localhost:5000`.

## API Documentation

Swagger UI is available at `/api-docs` endpoint. When running locally, you can access it at `http://localhost:5000/api-docs`.

## Scripts

- `npm run dev`: Start the development server with hot-reloading
- `npm start`: Start the production server
- `npm run build`: Build the project for production
- `npm test`: Run the test suite (to be implemented)

## Deployment

This project is configured for deployment on Render. Make sure to set the following environment variables in your Render dashboard:

- `NODE_ENV`: Set to `production`
- `PORT`: The port number Render should use (usually set automatically)
- `DB_HOST`: Your production database host
- `DB_USERNAME`: Your production database username
- `DB_PASSWORD`: Your production database password
- `DB_NAME`: Your production database name
- `JWT_SECRET`: A secure secret for JWT token generation
- `BASE_URL`: The URL of your deployed application (e.g., https://pearmonie-task.onrender.com)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.