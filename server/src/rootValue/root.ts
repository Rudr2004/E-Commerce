import User from "../User/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const root = {
    users: async () => {
        return await User.find();
    },
    
    addUser: async ({ details }) => {
        try {
            const newUser = await User.create(details);
            console.log("Created user:", newUser);

            if (!newUser) {
                throw new Error("User creation failed");
            }

            return newUser;
        } catch (error) {
            console.error("Error in addUser:", error);
            throw new Error("Internal Server Error");
        }
    },
    signup: async ({ details }) => {
        try {
            const { name, email, password } = details;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("User already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "50d" });

            return { name: newUser.name, email: newUser.email, password: newUser.password };
        } catch (error) {
            console.error("Signup error:", error);
            throw new Error(error.message || "Signup failed");
        }
    }
};
