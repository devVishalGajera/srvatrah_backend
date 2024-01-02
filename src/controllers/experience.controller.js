import { experienceModel } from "../models/experience";


const createIntialExperience = async (req, res) => {
    const title = req.body.title;
    if(!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const intialExperience = await experienceModel.create({
        title: title
    });
    return res.status(200).json(intialExperience);
};

const updateExperience = async (req, res) => {
    const { id } = req.params;
    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    const nullOrNotPresentKeys = Object.keys(req.body).filter(key => req.body[key] !== null || req.body[key] !== undefined);
    if(nullOrNotPresentKeys.length === 0) {
        return res.status(400).json({ error: 'No data to update' });
    }
    const updatedDetails = nullOrNotPresentKeys.map(key => {
        return {
            [key]: req.body[key]
        }
    });
    const experience = await experienceModel.findByIdAndUpdate(id, {
       ...updatedDetails   
    });
    return res.status(200).json(experience);
};

const deleteExperience = async (req, res) => {
    const { id } = req.params;
    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    const experience = await experienceModel.findByIdAndDelete(id);
    return res.status(200).json(experience);
};

const getExperience = async (req, res) => {
    const { id } = req.params;
    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    const experience = await experienceModel.findById(id);
    return res.status(200).json(experience);
}

const getAllExperience = async (req, res) => {
    const experience = await experienceModel.find();
    return res.status(200).json(experience);
}

export { createIntialExperience, updateExperience, deleteExperience, getExperience, getAllExperience }