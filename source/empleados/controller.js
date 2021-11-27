const createError = require("http-errors");
const debug = require("debug")("app:module-empleados-controller");
const { EmpleadosService } = require("./services");
const { Response } = require("../common/response");
const { object } = require("webidl-conversions");

module.exports.EmpleadosController = {
  getEmpleados: async (req, res) => {
    try {
      let empleados = await EmpleadosService.getAll();
      Response.success(res, 200, "Lista de Empleados", empleados);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getEmpleadosStatus: async (req, res) => {
    try {
        const {
            params: { status },
          } = req;
      let empleados = await EmpleadosService.getFilterStatus(status);
      Response.success(res, 200, "Lista de Empleados", empleados);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getEmpleado: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let empleado = await EmpleadosService.getById(id);
      if (!empleado) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Empleado: ${id}`, empleado);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createEmpleado: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length < 6) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await EmpleadosService.create(body);
        Response.success(res, 201, "Empleado Agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  borrarEmpleado: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let empleado = await EmpleadosService.getById(id);
      if (!empleado) {
        Response.error(res, new createError.NotFound());
      } else {
          let de = await EmpleadosService.borrar(id);
        Response.success(res, 200, `Empleado Eliminado con exito: ${id}`, de);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
