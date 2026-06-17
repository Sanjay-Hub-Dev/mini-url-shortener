# Mini URL Shortener

A simplified URL shortening service built using **React**, **Node.js**, and **Express.js**.

This application allows users to convert long URLs into short URLs, redirect users using the generated short URL, and track the number of clicks for each shortened link.

---

## Features

* Generate short URLs from long URLs
* Collision-free short code generation
* Redirect to original URL
* Click tracking and analytics
* Copy short URL to clipboard
* URL validation
* Graceful handling of invalid short codes
* Responsive and clean user interface

---

## Tech Stack

### Frontend

* React
* Axios
* CSS

### Backend

* Node.js
* Express.js
* CORS

### Storage

* In-Memory JavaScript Object

No external database is used as per the project requirements.

---

## Project Structure

```text
mini-url-shortener
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## API Endpoints

### 1. Generate Short URL

**POST**

```http
/api/shorten
```

Request:

```json
{
  "url": "https://google.com"
}
```

Response:

```json
{
  "shortCode": "Ab12Cd",
  "shortUrl": "http://localhost:5000/Ab12Cd"
}
```

---

### 2. Redirect to Original URL

**GET**

```http
/:shortCode
```

Example:

```http
http://localhost:5000/Ab12Cd
```

Redirects user to the original URL.

---

### 3. Get URL Statistics

**GET**

```http
/api/stats/:shortCode
```

Response:

```json
{
  "shortCode": "Ab12Cd",
  "longUrl": "https://google.com",
  "clicks": 5,
  "createdAt": 1718600000000
}
```

---

## How It Works

1. User enters a long URL.
2. Frontend sends the URL to the backend.
3. Backend validates the URL.
4. Backend generates a unique short code.
5. Mapping is stored in memory.
6. Backend returns a shortened URL.
7. When the short URL is accessed:

   * Click count increases.
   * User is redirected to the original URL.
8. Statistics can be viewed through the stats API.

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Sanjay-Hub-Dev/mini-url-shortener.git

cd mini-url-shortener
```

---

## Backend Setup

Open Terminal 1

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open Terminal 2

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Running The Application

### Step 1

Start the backend server:

```bash
cd server
npm run dev
```

### Step 2

Start the frontend:

```bash
cd client
npm run dev
```

### Step 3

Open:

```text
http://localhost:5173
```

### Step 4

Enter a long URL and click **Shorten URL**.

### Step 5

Use the generated short URL to test redirection and click tracking.

---

## Future Improvements

* Persistent database storage (MongoDB)
* User authentication
* Custom short URLs
* Link expiration support
* QR code generation
* Detailed analytics dashboard

---

## Author

**Sanjay Dhavanam**

GitHub:
https://github.com/Sanjay-Hub-Dev
