import express from "express";
import cors from "cors";
import morgan from 'morgan';
import { RegisterRoutes } from "../routes";
import bodyParser from "body-parser";//教express拆Post信封
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

let app = express();
let port = 3001;

// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000', // 只允許從端口3000的請求
  optionsSuccessStatus: 200 // 某些舊版瀏覽器的支援
};
app.use(cors(corsOptions));

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({extended:true}));

RegisterRoutes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Todolist app listening on port ${port}`);
});
