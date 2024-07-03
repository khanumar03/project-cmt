const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const port = 3003;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!req.token) {
      const token = crypto.randomUUID();
      req.token = token;
    }

    const folderPath = `./tempfile/${req.token}`;
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder if not exist
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});
// const tempStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./temp");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${req.body}`);
//   },
// });

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.array("files"), (req, res) => {
  console.log(req.files);
  return res.status(200).json({ metadata: req.files });
});

app.delete("/delete", (req, res) => {
  fs.unlink(req.query.path, (err) => {
    if (err) {
      return res.status(203).json({ error: "something went wrong!" });
    }
  });
  const dirname = path.dirname(req.query.path);

  fs.readdir(dirname, (err, files) => {
    if (files.length == 0) {
      fs.rm(dirname, { recursive: true, force: true }, (err) => {
        if (err) console.log(err);
      });
    }
  });
  return res.status(201).json({ success: "deleted successfully" });
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
