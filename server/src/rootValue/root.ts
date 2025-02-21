import  cloudinary  from 'cloudinary';
import User from "../User/UserModel"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Product from '../Products/ProductModel';


const cloudinaryConfig = cloudinary.config({
  cloud_name: 'dxnbxg50o',
  api_key: 477496698155547,
  api_secret: '-9PkjnDjGMZYGvep6LkYvsD3yfM',
});

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

  createproduct: async (parent, { name, description, price, category, image }) => {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'items',
      resource_type: 'image',
    });

    // Create new product in database
    const product = new Product({
      name,
      description,
      price,
      category,
      image: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    await product.save();

    return product;
  },
};