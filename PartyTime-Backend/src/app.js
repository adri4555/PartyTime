import express from "express";
import cors from "cors";

require('dotenv').config();

import AuthRoutes from "./routes/auth.routes";

//Initialize express
const app = express();

//Set port
app.set('port', process.env.API_PORT);

//Configure Cors
app.use(cors());

//Configure middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", AuthRoutes);

export default app;