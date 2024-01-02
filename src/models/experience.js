import mongoose from "mongoose";
const expirenceSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    duration:String,
    location:String,
    category_theme:String,
    description:{
        short_des:String,
        detail_dec :String,
    },
    video_link:String,
    img_link:String,
    inclusions: {
        included:String,
        detail_des:String
    },
    Exclusions:{
        included:String,////,
        detail_des:String
    }
});


export const experienceModel = mongoose.model('experience',expirenceSchema);