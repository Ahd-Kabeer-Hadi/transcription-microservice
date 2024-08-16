# Transcription Microservice

## Overview

This project is a robust microservice designed to transcribe YouTube videos. It's built using Express with TypeScript, integrates with PostgreSQL (NeonDB) for data storage, and leverages Google Cloud services for speech recognition and language detection.

## Features

- Transcribe audio from YouTube videos
- Automatic language detection
- User authentication
- Rate limiting to prevent abuse
- Error handling and logging
- Scalable architecture
- API documentation with Swagger
- Monitoring with Prometheus

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- PostgreSQL database (We use NeonDB)
- Google Cloud account with Speech-to-Text and Translation APIs enabled

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Ahd-Kabeer-Hadi/transcription-microservice.git
   cd transcription-microservice
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   DATABASE_URL=your_neondb_connection_string
   GOOGLE_APPLICATION_CREDENTIALS=path_to_your_google_cloud_credentials.json
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Build the project:
   ```
   npm run build
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will start running on `http://localhost:3000` (or the port you specified in the `.env` file).

3. You can now use the API endpoints:
   - POST `/api/transcriptions`: Create a new transcription
   - GET `/api/transcriptions/:id`: Retrieve a specific transcription

For detailed API documentation, visit `http://localhost:3000/api-docs` after starting the server.

## API Documentation

This project uses Swagger for API documentation. After starting the server, you can access the Swagger UI at `http://localhost:3000/api-docs`.

## Testing

Run the test suite with:

```
npm test
```

## Monitoring

Prometheus metrics are exposed at the `/metrics` endpoint. You can configure your Prometheus server to scrape these metrics for monitoring.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you have any questions or feedback, please open an issue on GitHub.