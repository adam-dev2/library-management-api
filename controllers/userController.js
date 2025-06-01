const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const verify = await User.findOne({ email });
    if (verify) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Error while creating user", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "yoursecretkey",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Error while logging in user", error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const { fullname, email, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (fullname) filter.fullname = { $regex: fullname, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };

    const skip = (page - 1) * limit;
    const users = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments(filter);

    return res.status(200).json({
      message: 'Fetched users successfully',
      total: totalUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      users
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error while fetching users',
      error: err.message
    });
  }
};



exports.getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Fetched user by ID",
      user
    });
  } catch (err) {
    return res.status(500).json({ message: "Error while fetching user by ID", error: err.message });
  }
};


exports.profilePictureUpload = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = req.file.filename;
    await user.save();

    return res.status(200).json({
      message: "Profile picture uploaded",
      profilePicture: `/uploads/${req.file.filename}`,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Error uploading profile picture", error: err.message });
  }
};
