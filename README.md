# Movie App

A full-stack movie application using the TMDB API, built with React, Apollo Client, Redux Toolkit, and Node.js.

## Features

- Browse and search for movies using the TMDB API
- User-friendly interface with React and Swiper
- State management with Redux Toolkit
- GraphQL backend powered by Apollo Server
- Routing with React Router

## Technologies Used

- React
- Apollo Client
- React Router
- Redux Toolkit
- Swiper
- Node.js
- GraphQL

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

#### 1. Clone the repository:
```
bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
```
#### 2. Install dependencies for both client and server:

```
bash
cd client
npm install
cd ../server
npm install
```

#### 3. Set up environment variables:

**Create a .env file in the server/src directory:**

`TMDB_API_TOKEN=your_tmdb_api_token
`

#### 4.Running Locally 

**Start the backend server:**

`cd server
npm start`

server starts at http://localhost:4000/graphql
you can test the GraphQL API using a tool like Postman or GraphQL Playground.

**Start the frontend:**


`cd ../client
npm run dev
Open your browser at http://localhost:5173`


