import UserModel from "../../Models/UserModel.js";

class UserController {
  
  async getUser(request, response) {
    try {
      const { userId } = request.params;

      // Fetch the user data from the UserModel using the userId
      const user = await UserModel.findById(userId);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      // Return the user data as JSON
      return response.json(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async editUser(request, response) {
    try {
      const { userId } = request.params;
      const { name, email } = request.body;

      // Fetch the user data from the UserModel using the userId
      const user = await UserModel.findById(userId);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      // Update the user data
      user.name = name;
      user.email = email;

      // Save the updated user data
      await user.save();

      // Return the updated user data as JSON
      return response.json(user);
    } catch (error) {
      console.error("Error editing user:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  

}

export default new UserController();
