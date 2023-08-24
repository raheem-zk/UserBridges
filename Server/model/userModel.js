import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status:{
            type: Boolean,
            default: true,
        },
        image:{
            type:String,
            default: '1692811427377-Screenshot (240).png'
        }
    },
    { timestamps: true }
)

const userModel = mongoose.model("user", userSchema);
export default userModel;
