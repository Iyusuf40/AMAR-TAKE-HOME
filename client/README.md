# Real-time Quote Display - Client (Frontend)

This is the client-side (frontend) application for a simple real-time quote display, built with React and TypeScript. It fetches and displays simulated real-time stock quotes from a backend API.

## Features

*   **Symbol Input:** Users can select a stock symbol (AAPL, GOOGL, BTCUSD) from a dropdown.
*   **Get Quote Button:** Fetches the initial quote for the selected symbol when clicked.
*   **Real-time Updates:** Polls the backend API every 2 seconds to fetch and display updated prices.
*   **Loading Indicator:** Shows a loading spinner while fetching data.
*   **Timestamp:** Displays the timestamp of the last received quote update.

## Technologies Used

*   **React With Nextjs:**
*   **TypeScript:**
*   **Tailwind CSS:**
*   **Shadcn:**
*   **React Query:**

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Iyusuf40/AMAR-TAKE-HOME.git
    ```

2.  **Navigate to the client directory:**

    ```bash
    cd client
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Start the production server:**

    ```bash
    npm run build
    npm run start
    ```

## Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Please ensure the server/API is running**

3.  **Open your browser:**

    Open [http://localhost:3000](http://localhost:3000) to view the application.

## Configuration

*   **API Base URL:** The base URL for the backend API is configured in `next.config.ts`:

    ```typescript
    // next.config.ts
    env: {
        API_BASE_URL: "http://127.0.0.1:2025"
    }
    ```

    Make sure this URL matches the address where your backend server is running. By default, it's set to `http://127.0.0.1:2025`.
