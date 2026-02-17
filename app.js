import express from "express";
const app = express();
app.use(express.json());
import employeeRouter from "#api/employees";
export default app;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong! Woops!");
});
