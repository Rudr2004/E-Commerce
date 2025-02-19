import User from "../User/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../Products/ProductModel";

export const root = {
    //All the users
    users: async () => {
        return await User.find();
    },
    product: async()=>{
        return await Product.find()
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

            //const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "50d" });
            return { name: newUser.name, email: newUser.email, password: newUser.password };
        } catch (error) {
            console.error("Signup error:", error);
            throw new Error(error.message || "Signup failed");
        }
    },
    login: async ({login}) =>{
        try {
            const { email, password } = login;
            const user = await User.findOne({ email });
            if(!user){
                throw new Error("User not found");
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                throw new Error("Invalid password");
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "50d" })
            return { email: user.email, password: user.password , token }
        } catch (error) {
            
        }
    },

    createproduct: async({product})=>{
        try {
            const {name,price,description,category,images} = product;
            const newProduct = new Product({name,price,description,category,images});
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log("Error to create a new Product", error)
            throw new Error(error.message)
        }
    }
};
