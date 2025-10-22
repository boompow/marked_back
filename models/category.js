import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Title must not be empty"],
        maxlength: [30, "Title cannot exceed 30 characters"]
    },

    description:{
        type:String,
        maxlength: [200, "Description cannot exceed 200 characters"],
        default:""
    },

    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
}, {
    timestamps: true
})

const Category = model("Category", categorySchema)

export default Category;