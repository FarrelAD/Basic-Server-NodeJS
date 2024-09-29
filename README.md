# Basic Node.js Web Service Project

![NodeJS](docs/img/nodejs.jpg)

This is a basic web service project built with **native Node.js**, without any external frameworks. It covers basic routing, handling different HTTP methods, and working with URL parameters and query strings. The goal of this project is to serve as a reference for anyone looking to understand how a web service can be written using just Node.js.

## Features

- **Basic Routing**: Set up routes for different endpoints.
- **Route with Parameters**: Handle dynamic routes with URL parameters.
- **Query Parameters**: Extract and process query strings from the URL.
- **HTTP Methods**: Support for common HTTP method: `GET`, `POST`, `PUT`, `DELETE`

## Getting Started

### Prerequisites

Ensure you have **Node.js** installed on your machine.

- [Download Node.js](https://nodejs.org/en/download/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/FarrelAD/Basic-Web-Service-NodeJS.git
    ```
2. Navigate into the project directory:
    ```bash
    cd Basic-Web-Service-NodeJS
    ```
3. Install any required dependencies (if applicable):
    ```bash
    npm install
    ```

### Running the Server

To start the web service, run the following command:

```bash
npm run start
```
The server will be running at http://localhost:5000

## Endpoints
Here are the key endpoints that you can interact with:

```
GET /: Returns a simple welcome message
GET /users: Provide a simple form to submit data
GET /users/:id: Fetch a data by their ID
POST /users: Add a new user
PUT /users/:id: Update user information
DELETE /users/:id: Delete a user by their ID
```

## Query Parameters
Example: /search?name=John&age=25
Query parameters can be extracted and used in request processing.

## HTTP Methods
The service supports the following HTTP methods:

```
GET: Retrieve data.
POST: Submit new data.
PUT: Update existing data.
DELETE: Remove data.
```

## Code Structure
The project is simple and has the following structure:

```bash
/root
├─ index.js       # Main server logic
└── /src
       ├─ /controller # A handler for any request
       ├─ /data           # JavaScript object format to store dummy data
       └─ /routes         # Contains routing logic for different endpoints
```

## Contributing
Feel free to fork this repository and use it as a reference or make improvements! Contributions are welcome.

Fork the repository.
Create a new branch: git checkout -b feature-branch-name.
Make your changes and commit: git commit -m 'Added some feature'.
Push to the branch: git push origin feature-branch-name.
Submit a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgments
This project is intended to help others learn the basics of building a web service with Node.js.