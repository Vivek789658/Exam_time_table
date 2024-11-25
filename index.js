const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/exams/:course/:sem/:scheme", function (req, res) {
  const course = decodeURIComponent(req.params.course);
  const sem = decodeURIComponent(req.params.sem);
  const scheme = decodeURIComponent(req.params.scheme);

  console.log(`Course: ${course}, Semester: ${sem}, Scheme: ${scheme}`);

  const filePath = path.join(__dirname, "sample.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err);
      res.status(500).json({ error: "Error reading the file" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      if (Array.isArray(jsonData)) {
        const filteredData = jsonData.filter(
          (item) =>
            item.Sem &&
            item.Branch &&
            item.Schm &&
            item.Sem.toString() === sem &&
            item.Branch.toString() === course &&
            item.Schm.toString() === scheme
        );

        if (filteredData.length > 0) {
          res.json(filteredData);
        } else {
          res.status(404).json({ error: "No data found for the specified criteria" });
        }
      } else {
        res.status(404).json({ error: "Invalid data structure" });
      }
    } catch (err) {
      console.error("Error parsing JSON", err);
      res.status(500).json({ error: "Error parsing JSON" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});