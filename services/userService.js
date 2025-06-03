const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUserService = async ({ fullname, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ fullname, email, password: hashedPassword });
  await newUser.save();

  return {
    id: newUser._id,
    fullname: newUser.fullname,
    email: newUser.email,
  };
};

exports.loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("notfound");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("invalid");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "yoursecretkey",
    { expiresIn: "2h" }
  );

  return {
    token,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  };
};

exports.getAllUsersService = async (filters, page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find(filters)
    .select("-password")
    .skip(skip)
    .limit(parseInt(limit));
  const totalUsers = await User.countDocuments(filters);

  return { users, totalUsers };
};

exports.getUserByIdService = async (id) => {
  return await User.findById(id).select("-password");
};

exports.uploadProfilePictureService = async (id, filename) => {
  const user = await User.findById(id);
  if (!user) return null;

  user.profilePicture = filename;
  await user.save();

  return {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    profilePicture: `/uploads/${filename}`,
  };
};
