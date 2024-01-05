const availabilityModel = require("../models/availability.model");
const experienceModel = require("../models/experience");
const meetingPointModel = require("../models/meetingPickup.model");
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

  const body = req.body;
  console.log(body, "body");
  const nullOrNotPresentKeys = Object.keys(req.body).filter(
    (key) => body[key] !== null || body[key] !== undefined
  );

  if (nullOrNotPresentKeys.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }

  const updatedDetails = nullOrNotPresentKeys.map((key) => {
    if (key === "img_link") {
      return {
        [key]: body[key].map((img) => ({
          filename: img.filename,
          path: "http://127.0.0.1:3232/" + img.path.replace("public/", ""),
          mimetype: img.mimetype,
        })),
      };
    }
    return {
      [key]: body[key],
    };
  });

  const keys = Object.keys(updatedDetails[0]);
  console.log(keys, "keys");

  if (keys.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }

  if (keys.includes("img_link")) {
    updatedDetails[0].img = updateExperience.img_link.map((img) => ({
      filename: img.filename,
      path: "http://127.0.0.1:3232/" + img.path.replace("public/", ""),
      mimetype: img.mimetype,
    }));
    delete updatedDetails[0].img_link;
  }

  const experience = await experienceModel.findByIdAndUpdate(
    id,
    { ...updatedDetails[0] },
    { new: true }
  );

  return res.status(200).json(experience);
};

// const updateExperience = async (req, res) => {
//   console.log(req.body, "body");
//   const { id } = req.params;
//   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid id" });
//   }
//   const body = req.query;

//   const nullOrNotPresentKeys = Object.keys(req.query).filter(
//     (key) => body[key] !== null || body[key] !== undefined
//   );
//   if (nullOrNotPresentKeys.length === 0) {
//     return res.status(400).json({ error: "No data to update" });
//   }
//   console.log(body, "body");
//   const updatedDetails = nullOrNotPresentKeys.map((key) => {
//     if (key === "img_link") {
//       return {
//         [key]: body[key].map((img) => {
//           return {
//             filename: img.filename,
//             path: "http://127.0.0.1:3232/" + img.path.replace("public/", ""),
//             mimetype: img.mimetype,
//           };
//         }),
//       };
//     }
//     if (key === "category_theme") {
//       console.log(body[key]);
//       return {
//         [key]: JSON.parse(body[key]),
//       };
//     }
//     return {
//       [key]: body[key],
//     };
//   });
//   const keys = Object.keys(updatedDetails[0]);
//   if (keys.length === 0) {
//     return res.status(400).json({ error: "No data to update" });
//   }
//   if (keys.includes("img_link")) {
//     updatedDetails[0].img = updateExperience.img_link.map((img) => {
//       return {
//         filename: img.filename,
//         path: "http://127.0.0.1:3232/" + file.path.replace("public/", ""),
//         mimetype: file.mimetype,
//       };
//     });
//     delete updatedDetails[0].img_link;
//   }
//   const experience = await experienceModel.findByIdAndUpdate(
//     id,
//     {
//       ...updatedDetails[0],
//     },
//     { new: true }
//   );
//   return res.status(200).json(experience);
// };

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

//meeting_point | pricing | availability_detail
const updateExperienceWithAvailability = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const body = req.body;
  const experience = await experienceModel.findById(id);
  if (!experience) {
    return res.status(400).json({ error: "Experience not found" });
  }
  const keys = Object.keys(body);
  if (keys.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }
  const availability_array = [];
  const insertManyAvailability = await availabilityModel.insertMany(
    body.availability_detail
  );
  for (let i = 0; i < insertManyAvailability.length; i++) {
    availability_array.push(insertManyAvailability[i]._id);
  }
  const updatedExperience = await experienceModel.findByIdAndUpdate(
    id,
    {
      availability_detail: availability_array,
    },
    { new: true }
  );
  return res.status(200).json(updatedExperience);
};

const insertManyMeetingPoint = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const experience = await experienceModel.findById(id);
  if (!experience) {
    return res.status(400).json({ error: "Experience not found" });
  }
  const body = req.body;
  console.log(body, "body");
  const keys = Object.keys(body);
  if (keys.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }
  const insertManyMeetingPoint = await meetingPointModel.insertMany(
    body.meeting_point
  );
  const updatedExperience = await experienceModel.findByIdAndUpdate(
    id,
    {
      meeting_point: insertManyMeetingPoint,
    },
    { new: true }
  );
  return res.status(200).json(updatedExperience);
};

module.exports = {
  getAllExperience,
  getExperience,
  createIntialExperience,
  updateExperience,
  deleteExperience,
  insertManyMeetingPoint,
  updateExperienceWithAvailability,
};
