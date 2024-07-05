import express, { Application, Request } from "express";
import { router } from "./Routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(process.env.PORT, () => console.log("server is running"));
