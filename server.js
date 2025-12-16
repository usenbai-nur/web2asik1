const express = require("express");   // import express
const app = express();               // create app

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  // валидайия
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    return res.send(`
      <h2 style="color:red;">wrong input! Please enter positive numbers.</h2>
      <a href="/">Go Back</a>
    `);
  }

  const bmi = weight / (height * height);

  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "orange";
  } else if (bmi < 24.9) {
    category = "Normal";
    color = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "goldenrod";
  } else {
    category = "Obese";
    color = "red";
  }

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="card">
          <h1>BMI Result</h1>
          <p>Your BMI is:</p>
          <h2 style="color:${color};">${bmi.toFixed(2)}</h2>
          <h3 style="color:${color};">${category}</h3>
          <a href="/">Calculate Again</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
