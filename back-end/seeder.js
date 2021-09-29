import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./modules/userModule.js";
import Product from "./modules/productModule.js";
import Order from "./modules/orderModule.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUsers = createdUsers[0]._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUsers };
    });

    await Product.insertMany(sampleProduct);
    console.log(`Data Imported!`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data deleted succesfully".blue.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}