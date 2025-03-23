# Real-time Quote Display - Server (Backend)

This is the backend server application for a simple real-time quote display, built with Node.js, Express, and TypeScript. It simulates real-time stock quote updates and provides an API endpoint for fetching these quotes.

## Features

*   **Real-time Quote Simulation:** Simulates real-time price fluctuations for a set of financial symbols (AAPL, GOOGL, BTCUSD).
*   **API Endpoint:** Provides a RESTful API endpoint to fetch the current price for a given symbol.
*   **Error Handling:** Handles invalid symbol requests and other potential errors gracefully.
*   **CORS Support:** Enables Cross-Origin Resource Sharing to allow requests from the frontend application.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web application framework for Node.js.
*   **TypeScript:** Typed superset of JavaScript.
*   **Supertest:** For testing the API.
*   **Mocha:** For running tests.
*   **tsx:** For running typescript files.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Iyusuf40/AMAR-TAKE-HOME.git
    ```

2.  **Navigate to the server directory:**

    ```bash
    cd server
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Start the production server:**

    ```bash
    npm run build
    npm run start
    ```

3.  **Run tests:**

    ```bash
    npm run test
    ```

## API Endpoints

*   **GET /ping:**
    *   Description: Health check endpoint.
    *   Response: `{ message: "pong" }`
*   **GET /api/quote/:symbol:**
    *   Description: Fetches the current quote for the given symbol.
    *   Parameters:
        *   `symbol` (string, required): The financial symbol (e.g., AAPL, GOOGL, BTCUSD).
    *   Response ({ price: number, symbol: string }):
        