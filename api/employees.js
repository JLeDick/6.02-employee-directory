import express from "express";
import employees, { addEmployee } from "#db/employees";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(employees);
});

router.post("/", (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body");

  if (!req.body.name) return res.status(400).send("Request must have a name");

  const employee = addEmployee(req.body.name);
  res.status(201).send(employee);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
export default router;
