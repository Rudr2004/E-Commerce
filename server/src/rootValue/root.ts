import  cloudinary  from 'cloudinary';
import User from "../User/UserModel"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Product from '../Products/ProductModel';




export const root = {
  // All the users
  users: async () => {
    return await User.find();
  },
  products: async () => {
    return await Product.find();
  },
  product: async (args) => {
    return await Product.findById(args.id);
  },

  signup: async ({ details }) => {
    try {
      const { name, email, password } = details;

      const existingUser  = await User.findOne({ email });
      if (existingUser ) {
        throw new Error('User  already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '50d' });
      return { name: newUser.name, email: newUser.email, password: newUser.password, token };
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    }
  },
  login: async ({ login }) => {
    try {
      const { email, password } = login;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User  not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '50d' });
      return { email: user.email, password: user.password, token };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  createproduct: async ({ product }) => {
    console.log("Received product input:", product); 
  
    if (!product) {
      throw new Error("Product input is missing.");
    }
  
    const { name, description, price, category, image } = product;
  
    // Ensure all required fields are present
    if (!name || !description || !price || !category) {
      throw new Error("All fields (name, description, price, category) are required.");
    }
  
    // Ensure price is a number and greater than 0
    if (typeof price !== "number" || price <= 0) {
      throw new Error("Price must be a positive number.");
    }
  
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image
    });
  
    await newProduct.save();
    return newProduct;
  },
  
};