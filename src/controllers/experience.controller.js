const experienceModel = require("../models/experience");
const mongoose = require("mongoose");
const createIntialExperience = async (req, res) => {
  try {
    const title = req.query.title;
    if (!title || title.trim() === "" || title.length === 0) {
      return res.status(400).json({ error: "Title is required" });
    }
    const intialExperience = await experienceModel.create({
      title: title,
    });
    return res.status(200).json(intialExperience);
  } catch (error) {
    console.log(error, "error in creating initial experience");
  }
};

const updateExperience = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const body = req.query;

  const nullOrNotPresentKeys = Object.keys(req.query).filter(
    (key) => body[key] !== null || body[key] !== undefined
  );
  if (nullOrNotPresentKeys.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }
  const updatedDetails = nullOrNotPresentKeys.map((key) => {
    return {
      [key]: body[key],
    };
  });
  const keys = Object.keys(updatedDetails[0]);
  if (keys.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }
  if (keys.includes("img_link")) {
    updatedDetails[0].img = updateExperience.img_link.map((img) => {
      return {
        filename: img.filename,
        path: "http://127.0.0.1:3232/" + file.path.replace("public/", ""),
        mimetype: file.mimetype,
      };
    });
    delete updatedDetails[0].img_link;
  }
  const experience = await experienceModel.findByIdAndUpdate(
    id,
    {
      ...updatedDetails[0],
    },
    { new: true }
  );
  return res.status(200).json(experience);
};

const deleteExperience = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const experience = await experienceModel.findByIdAndDelete(id);
  return res.status(200).json(experience);
};

const getExperience = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const experience = await experienceModel.findById(id);
  return res.status(200).json(experience);
};

const getAllExperience = async (req, res) => {
  const experience = await experienceModel.find();
  return res.status(200).json(experience);
};

module.exports = {
  getAllExperience,
  getExperience,
  createIntialExperience,
  updateExperience,
  deleteExperience,
};
