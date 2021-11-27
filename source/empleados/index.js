const express = require("express");

const router = express.Router();
const {EmpleadosController} = require('./controller');

module.exports.EmpleadosAPI = (app) => {
  router
    .get("/",EmpleadosController.getEmpleados)
    .get("/:id",EmpleadosController.getEmpleado)
    .post("/",EmpleadosController.createEmpleado)
    .delete("/:id",EmpleadosController.borrarEmpleado)
    .get("/status/:status",EmpleadosController.getEmpleadosStatus)

  app.use("/api/empleados", router);
};
