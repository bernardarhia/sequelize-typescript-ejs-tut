import express from "express";
import { Application } from "express";
const app: Application = express();
import cookieParser from "cookie-parser";
// Set EJS as template engine
app.set("view engine", "ejs");

app.use(cookieParser("my secret"));
// Import public route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // PUBLIC ROUTES
// import route from "./public_routes";
// app.use(route);

// API ROUTES
import userRouter from "./routes/Users";
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
