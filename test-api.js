const http = require("http");

// Configuration
const host = "localhost";
const port = 3000;

// ANSI color codes for better readability
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

console.log(`${colors.cyan}===== University Landing Page API Test =====`);
console.log(
  `${colors.yellow}Testing API endpoints on http://${host}:${port}...${colors.reset}\n`
);

// Test GET /api/courses
function testGetCourses() {
  return new Promise((resolve, reject) => {
    console.log(`${colors.magenta}Testing GET /api/courses...${colors.reset}`);

    const options = {
      host,
      port,
      path: "/api/courses",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          if (res.statusCode !== 200) {
            console.log(
              `${colors.red}✗ Failed: Status code ${res.statusCode}${colors.reset}`
            );
            reject(new Error(`Failed with status code ${res.statusCode}`));
            return;
          }

          const courses = JSON.parse(data);

          if (!Array.isArray(courses)) {
            console.log(
              `${colors.red}✗ Failed: Response is not an array${colors.reset}`
            );
            reject(new Error("Response is not an array"));
            return;
          }

          if (courses.length === 0) {
            console.log(
              `${colors.yellow}⚠ Warning: No courses returned${colors.reset}`
            );
          } else {
            console.log(
              `${colors.green}✓ Success: Received ${courses.length} courses${colors.reset}`
            );
            console.log(
              `${colors.blue}Sample course: ${JSON.stringify(
                courses[0],
                null,
                2
              )}${colors.reset}`
            );
          }

          resolve();
        } catch (err) {
          console.log(`${colors.red}✗ Failed: ${err.message}${colors.reset}`);
          reject(err);
        }
      });
    });

    req.on("error", (err) => {
      console.log(`${colors.red}✗ Error: ${err.message}${colors.reset}`);
      reject(err);
    });

    req.end();
  });
}

// Test POST /api/contact
function testPostContact() {
  return new Promise((resolve, reject) => {
    console.log(`${colors.magenta}Testing POST /api/contact...${colors.reset}`);

    const data = JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message from the API test script.",
    });

    const options = {
      host,
      port,
      path: "/api/contact",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = http.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          if (res.statusCode !== 200) {
            console.log(
              `${colors.red}✗ Failed: Status code ${res.statusCode}${colors.reset}`
            );
            reject(new Error(`Failed with status code ${res.statusCode}`));
            return;
          }

          const response = JSON.parse(responseData);

          if (!response.success) {
            console.log(
              `${colors.red}✗ Failed: Request not successful${colors.reset}`
            );
            reject(new Error("Request not successful"));
            return;
          }

          console.log(
            `${colors.green}✓ Success: Contact form submission successful${colors.reset}`
          );
          console.log(
            `${colors.blue}Response: ${JSON.stringify(response, null, 2)}${
              colors.reset
            }`
          );

          resolve();
        } catch (err) {
          console.log(`${colors.red}✗ Failed: ${err.message}${colors.reset}`);
          reject(err);
        }
      });
    });

    req.on("error", (err) => {
      console.log(`${colors.red}✗ Error: ${err.message}${colors.reset}`);
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

// Main test function
async function runTests() {
  console.log(`${colors.yellow}Running API tests...${colors.reset}\n`);

  try {
    await testGetCourses();
    console.log(""); // Add spacing between tests
    await testPostContact();

    console.log(
      `\n${colors.green}✓ All tests completed successfully!${colors.reset}`
    );
  } catch (err) {
    console.log(
      `\n${colors.red}✗ Some tests failed. See above for details.${colors.reset}`
    );
    process.exit(1);
  }
}

// Check if server is running first
function checkServerConnection() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host,
        port,
        path: "/",
        method: "GET",
      },
      (res) => {
        resolve(true);
      }
    );

    req.on("error", (err) => {
      console.log(
        `${colors.red}✗ Error: Cannot connect to server at http://${host}:${port}`
      );
      console.log(
        `Make sure the server is running with 'npm run dev' or 'node run.js'${colors.reset}`
      );
      reject(err);
    });

    req.end();
  });
}

// Run the tests
checkServerConnection()
  .then(runTests)
  .catch((err) => {
    process.exit(1);
  });
