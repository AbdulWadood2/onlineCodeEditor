import express from "express";
import cors from "cors";
const app = express();
const port = 3001;
import route from "./routes/userRoute.js";

app.use(cors()); // Enable CORS middleware first it is important because it is not work when we not put it on top
app.use(express.json());
app.use("/api", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
