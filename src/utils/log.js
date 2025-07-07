const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaHJ1dmJhZ2hhbkBnbWFpbC5jb20iLCJleHAiOjE3NTE4NzEwMzcsImlhdCI6MTc1MTg3MDEzNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA0Y2NmMjMxLTE4ZTEtNGU1OC05MzVmLTE0YTY4YjAzOTUwOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImRocnV2IGJhZ2hhbiIsInN1YiI6Ijg4ZWE2MzZjLTM1OGYtNDJmOS04NDAwLWE1MThhNjYxOTQ2MSJ9LCJlbWFpbCI6ImRocnV2YmFnaGFuQGdtYWlsLmNvbSIsIm5hbWUiOiJkaHJ1diBiYWdoYW4iLCJyb2xsTm8iOiI3MDIyMDgwMjcyMiIsImFjY2Vzc0NvZGUiOiJ6Q1J2dU4iLCJjbGllbnRJRCI6Ijg4ZWE2MzZjLTM1OGYtNDJmOS04NDAwLWE1MThhNjYxOTQ2MSIsImNsaWVudFNlY3JldCI6ImRSQXF2Q21ETk5SQlR2RFEifQ.68jfBSZlXaAQCRpICjewZGM6ocoVVw3jR58bgXFvms0`;  // no line breaks

export async function log(stack, level, pkg, message) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}` 
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Log failed:", errData);
    } else {
      const data = await response.json();
      console.log("Log success:", data.message);
    }
  } catch (err) {
    console.error("Log error:", err.message);
  }
}
