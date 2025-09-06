import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(
	cors({
		// origin: ["https://taskmanagerr-8gob.onrender.com", "http://localhost:5173"],
		origin: true,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
