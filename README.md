URL Shortener API

Overview

This project is a simple URL shortener API that takes a long URL and returns a shortened version using NanoID. It also provides an endpoint to redirect users from the short URL to the original URL.

Features

Shorten long URLs into unique short links.

Redirect users from a short URL to the original URL.

Simple and lightweight API built with Node.js and Express.

Uses NanoID for generating unique short URLs.

Tested using Postman.

Tech Stack

Node.js (JavaScript runtime)

Express.js (Web framework for Node.js)

NanoID (Unique ID generator for short URLs)

MongoDB (For storing shortened URLs) (if using a database)

Postman (For API testing)

Installation & Setup

Clone the repository:

git clone https://github.com/your-username/url-shortener.git
cd url-shortener

Install dependencies:

npm install

Start the server:

npm start

The server will run on http://localhost:3000 (or any specified port).

API Endpoints

1. Shorten a URL

Endpoint: POST /api/shorten

Request Body (JSON):

{
  "originalUrl": "https://example.com"
}

Response:

{
  "shortUrl": "HVCTRAF1"
}

2. Redirect to Original URL

Endpoint: GET /api/redirect/:shortUrl

Example Request:

http://localhost:3000/api/redirect/HVCTRAF1

Response: Redirects to the original URL.

Common Issues & Fixes

1. ERR_UNSAFE_PORT in Chrome

Chrome blocks some ports like 6000. Change the server port to 3000, 5000, or 8080 in server.js:

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

Then restart the server.

Alternatively, use Firefox, which does not block unsafe ports.

Testing

Use Postman to test POST and GET requests.

Ensure the server is running before making API calls.

Future Improvements

Add a database (MongoDB) to persist URLs.

Implement analytics (track number of clicks per short URL).

Add user authentication for URL management.

License

This project is licensed under the

https://roadmap.sh/projects/url-shortening-service
