const userService = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    try {
      const user = await userService.registerUserService({ fullname, email, password });
      return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      if (err.message === "exists") {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      throw err;
    }
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

    try {
      const { token, user } = await userService.loginUserService({ email, password });
      return res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
      if (err.message === "notfound") {
        return res.status(404).json({ message: "User not found" });
      } else if (err.message === "invalid") {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      throw err;
    }
  } catch (err) {
    return res.status(500).json({ message: "Error while logging in user", error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { fullname, email, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (fullname) filters.fullname = { $regex: fullname, $options: "i" };
    if (email) filters.email = { $regex: email, $options: "i" };

    const { users, totalUsers } = await userService.getAllUsersService(filters, page, limit);

    return res.status(200).json({
      message: "Fetched users successfully",
      total: totalUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error while fetching users", error: err.message });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const user = await userService.getUserByIdService(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Fetched user by ID", user });
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

    const user = await userService.uploadProfilePictureService(id, req.file.filename);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile picture uploaded",
      profilePicture: user.profilePicture,
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error uploading profile picture", error: err.message });
  }
};
