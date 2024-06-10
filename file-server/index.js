const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("file"), (req, res) => {
  return res.status(200).json({ msg: "ok" });
});

app.get("/getfile", (req, res) => {
  let filePath = path.join(__dirname, "uploads", "1717764041929-Resume1.docx");
  let ext = path.extname(filePath);

  fs.readFile(filePath, (error, data) => {
    if (error) return res.status(500).json({ error });
    res.end(data, "binary");
  });
});

app.listen(port, () => console.log(`Server Started`));

// Nalle Pull Req accept kar
