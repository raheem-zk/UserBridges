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
        }
    },
    { timestamps: true }
)

const userModel = mongoose.model("user", userSchema);
export default userModel;
