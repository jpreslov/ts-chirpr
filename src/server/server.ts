import * as express from "express";
import apiRouter from "./routes";
import * as path from 'path'

const app = express();

app.use(express.static("public"));

//parses incoming data correctly
app.use(express.json());

//uses routes folder (hover over import path to see specifics)
app.use("/api", apiRouter);

//allows react router to work without interference from express's GET attempts
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
