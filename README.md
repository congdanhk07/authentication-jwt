# Web Base JWT Axios Interceptors

This project is a web application that demonstrates the use of JWT (JSON Web Tokens) for authentication and Axios interceptors for handling API requests and responses. It includes both a front-end built with React and a back-end using Express.js.

## Features

- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **Axios Interceptors**: Custom Axios instance with request and response interceptors for handling authentication tokens.
- **Protected Routes**: Implemented using React Router to restrict access to certain pages based on user authentication status.
- **Login and Logout**: User can log in and log out, with session management handled via JWTs.
- **API Endpoints**: Includes endpoints for login, logout, and token refresh.

## Technologies Used

- **Front-end**: React, React Router, Axios, Material-UI
- **Back-end**: Express.js, JWT, HTTP Status Codes
- **Other**: React Hook Form, React Toastify

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies for the front-end**:

   ```bash
   cd web-base-jwt-axios-interceptors
   yarn install
   ```

3. **Install dependencies for the back-end**:
   ```bash
   cd api-base-jwt-axios-interceptors
   yarn install
   ```

### Running the Application

1. **Start the back-end server**:

   ```bash
   cd api-base-jwt-axios-interceptors
   yarn dev
   ```

2. **Start the front-end development server**:

   ```bash
   cd web-base-jwt-axios-interceptors
   yarn dev
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:8017`.

## Project Structure

- **web-base-jwt-axios-interceptors**: Contains the React front-end application.
- **api-base-jwt-axios-interceptors**: Contains the Express.js back-end application.

## API Endpoints

- **POST /v1/users/login**: User login.
- **DELETE /v1/users/logout**: User logout.
- **PUT /v1/users/refresh_token**: Refresh access token.
- **GET /v1/dashboards/access**: Access dashboard data (protected route).

## Acknowledgments

- Inspired by various JWT and Axios tutorials and examples.
