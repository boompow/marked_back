import { Schema, model } from "mongoose"

const linkSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Title must not be empty"],
        maxlength: [30, "Title cannot exceed 30 characters"]
    },

    url: {
        type: String,
        required: [true, "URL is required"],
        trim: true,
        validate: {
            validator: value => /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value),
            message: "Invalid URL format"
        }
    },
    
    screenshot: {
        type: String,
        trim: true,
        validate: {
            validator: value => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value),
            message: "Invalid logo URL format"
        }
    },

    screenshot_public_id:{
        type: String,
        trim: true,
    },


    description:{
        type: String,
        trim: true,
        maxlength: [200, "Description cannot exceed 200 characters"],
        default:""
    },

    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    hasCategory:{
        type: Boolean,
        default: false,
    },

    categoryId:{
        type: Schema.Types.ObjectId,
        ref:"Category"
    }
}, {
    timestamps: true
})

const Link = model("Link", linkSchema)

export default Link