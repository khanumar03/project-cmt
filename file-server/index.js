const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3003;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!req.token) {
      const token = crypto.randomUUID();
      req.token = token;
    }

    const folderPath = `./tempfile/${req.token}`;
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
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

app.post("/upload", upload.array("files"), (req, res) => {
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
      fs.rmdir(dirname, { recursive: true, force: true }, (err) => {
        if (err) console.log(err);
      });
    }
  });
  return res.status(201).json({ success: "deleted successfully" });
});

app.delete("/file/all", (req, res) => {
  const { files } = req.body;

  files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        return res.status(203).json({ error: "something went wrong!" });
      }
    });
    const dirname = path.dirname(file.path);

    fs.readdir(dirname, (err, files) => {
      if (files.length == 0) {
        fs.rmdir(dirname, { recursive: true, force: true }, (err) => {
          if (err) console.log(err);
        });
      }
    });
  });
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

app.post("/updatepath", (req, res) => {
  const { confID, domain, subID, files } = req.body.data;

  const folderPath = `./uploads/${confID}/${domain}/${subID}`;
  fs.mkdirSync(folderPath, { recursive: true });
  const result = [];

  files.forEach((file) => {
    fs.rename(file.path, folderPath + `/${file.filename}`, (err) => {
      if (err) console.log(err);
    });
    fs.readdir(path.dirname(file.path), (err, files) => {
      if (files.length == 0) {
        fs.rmdir(
          path.dirname(file.path),
          { recursive: true, force: true },
          (err) => {
            if (err) console.log(err);
          }
        );
      }
      file.path = folderPath + `/${file.filename}`;
      file.destination = folderPath;
      result.push(file);
    });
  });

  return res.status(200).json({ result });
});

// if (fs.existsSync("./tempfile/sdsd")) {
//   fs.rmdirSync("./tempfile/sdsd", { recursive: true });
// } else {
//   console.log(`Directory ./tempfile/sdsd" does not exist.`);
// }

app.listen(port, () => console.log(`Server Started`));
