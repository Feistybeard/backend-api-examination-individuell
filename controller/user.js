const userModel = require("../model/user");
const jwt = require("jsonwebtoken");

async function addUser(req, res) {
  try {
    const { username, password } = req.body;
    const userExist = await userModel.checkUsername(username);
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, error: "Användarnamnet finns redan!" });
    } else {
      const newUser = await userModel.addUser(username, password);
      return res
        .status(200)
        .json({ success: true, message: "Användare skapad!" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.checkUsername(username);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Användaren finns inte!",
      });
    }

    if (user) {
      const checkPassword = await userModel.checkPassword(
        password,
        user.password
      );

      if (checkPassword) {
        const token = jwt.sign(
          { userId: user._id },
          "superdupersecretpassword",
          {
            expiresIn: "10m",
          }
        );
        return res.status(200).json({
          success: true,
          message: "Inloggad!",
          token,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "Felaktigt lösenord!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

async function validateToken(req, res) {
  try {
    const user = await userModel.getUser(req.userId);
    if (user) {
      res.status(200).json({
        success: true,
        message: "Token är giltig!",
        user: {
          username: user.username,
          id: user._id,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Token är inte giltig!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

module.exports = { addUser, loginUser, validateToken };
