# University Landing Page

This is a University landing page with a simple Node.js backend.

## Features

- Responsive university website with multiple pages (Home, About, Courses, Admissions, Contact, Login)
- Simple backend built with Express.js
- API endpoints for courses and contact form submissions
- No database required - all data is stored in memory

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd universitylandingpage
```

2. Install dependencies:
```bash
npm install
```

### Running the Server

There are two ways to run the server:

#### Using npm directly

Start the development server:
```bash
npm run dev
```

For production:
```bash
npm start
```

#### Using helper scripts

For easier setup and running, you can use the included helper scripts:

```bash
# Install dependencies and set up the project
node install.js

# Start the development server
node run.js
```

Once the server is running, access the website at:
```
http://localhost:3000
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/courses` - Returns a list of available courses
- `POST /api/contact` - Accepts contact form submissions

### Testing the API

You can test the API endpoints using the included test script:

```bash
# Make sure the server is running first
node test-api.js
```

This will test both API endpoints and show the results in the console.

## Project Structure

- `server.js` - Main entry point for the Express server
- `index.html`, `about.html`, etc. - Static HTML pages
- `styles.css` - Main CSS stylesheet
- `script.js` - Main JavaScript for the website
- `contact.js`, `courses.js` - JavaScript modules for specific functionality
- `images/` - Directory containing website images

## License

This project is open source and available under the [MIT License](LICENSE). 
