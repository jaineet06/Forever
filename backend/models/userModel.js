import mongoose from "mongoose";

// Creating schema of user collection
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false })

//if user collection already exists then returns the left or part 
                        // else creates a new collection with provide schema
const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel