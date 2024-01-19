import indexRouter from "./index";
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import fs from "fs";
import path from "path";

let app = express();
let port = 3001;

// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000', // 只允許從端口3000的請求
  optionsSuccessStatus: 200 // 某些舊版瀏覽器的支援
};
app.use(cors(corsOptions));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('tiny',{ stream: accessLogStream }));


app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
