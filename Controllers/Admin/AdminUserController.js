import { response } from "express";
import UserModel from "../../Models/UserModel.js";

class AdminUserController {
  // Get all users with pagination
  async getAllUsers(req, res) {
    try {
      const { page, limit } = req.query;
      const users = await UserModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const totalCount = await UserModel.countDocuments().exec();

      const totalPages = Math.ceil(totalCount / limit);

      res.json({
        users,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get users." });
    }
  }

  

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await UserModel.findByIdAndDelete(userId).exec();
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user." });
    }
  }


  async getUserById(req, res) {
    try {
      const { userId } = req.params;
      // return res.json(userId)
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user."+error});
    }
  }

  // Create a new user
  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user." });
    }
  }

  // Update user role (turn user to admin or otherwise)
  async updateUserRole(req, res) {
    try {
      const { userId } = req.params;
      const { isAdmin } = req.body;
      await UserModel.findByIdAndUpdate(userId, { isAdmin }).exec();
      res.json({ message: "User role updated successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user role." });
    }
  }
}

export default new AdminUserController();
