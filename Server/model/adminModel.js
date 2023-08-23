import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        admin: {
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

const adminModel = mongoose.model("admin", adminSchema);
export default adminModel;
