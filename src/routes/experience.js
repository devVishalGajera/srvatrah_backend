const express = require("express");
const experienceModel = require("../controllers/experience.controller");
const route = express.Router();

route.get("/", experienceModel.getAllExperience);
route
  .get("/:id", experienceModel.getExperience)
  .post("/", experienceModel.createIntialExperience)
  .put("/:id", experienceModel.updateExperience)
  .delete("/:id", experienceModel.deleteExperience);

module.exports = route;
