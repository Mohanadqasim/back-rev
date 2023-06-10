# Movie API Server

This is a server-side application that provides endpoints for retrieving and managing movie data. It utilizes the Express framework and communicates with a PostgreSQL database. The server interacts with a movie database API to fetch trending and popular movies and allows users to add their favorite movies to the database.

## Setup

To run the server locally, follow these steps:

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Create a `.env` file in the root directory and set the following environment variables:
   - `PORT`: The port number on which the server will run. If not provided, the default port is 3000.
   - `DATABASE_URL`: The connection URL for the PostgreSQL database.
   - `APIKey`: The API key for accessing the movie database API.
4. Ensure you have a PostgreSQL server running and provide the connection URL in the `DATABASE_URL` environment variable.
5. Start the server by running `npm start`.

## Endpoints

The server exposes the following endpoints:

- `GET /`: Returns a simple "Hello World" message as a test endpoint.
- `GET /trending`: Fetches the trending movies from the movie database API and returns the data in the specified format.
- `GET /popular`: Fetches the popular movies from the movie database API and returns the data in the specified format.
- `POST /favmovie`: Adds a favorite movie to the database.
- `PUT /favmovie/:id`: Updates the feedback of a favorite movie in the database.
- `GET /allfav`: Retrieves all favorite movies from the database.
- `DELETE /delfav/:id`: Deletes a favorite movie from the database.
- `GET *`: Handles any other routes that are not defined and returns a "Page Not Found" message.

## Error Handling

The server includes error handling for common scenarios. If an error occurs during the execution of any endpoint, the server will respond with a JSON object containing the error message and a status code.

## Dependencies

The server relies on the following dependencies:

- `express`: A web application framework for Node.js.
- `cors`: Middleware to enable Cross-Origin Resource Sharing (CORS) for the server.
- `pg`: PostgreSQL client library for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `axios`: Promise-based HTTP client for making API requests.

## Database

The server interacts with a PostgreSQL database to store favorite movies. The connection URL for the database should be provided in the `DATABASE_URL` environment variable.

## Note

This code sample assumes that you have already set up the required infrastructure, including a PostgreSQL database and an API key for the movie database API. Make sure to update the `.env` file with the appropriate values before running.
