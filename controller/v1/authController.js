const authService = require('../../services/v1/authService');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userRoleId = req.userRoleId;
    const user = await authService.register(username, email, password, userRoleId);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.status(200).json({
      message: 'Login successful',
      data: {
        user: {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      },
    });    
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.status(200).json({message:"Token refreshed successfully", result});
  } catch (error) {
    res.status(401).json({message:"Token refresh failed", error});
  }
};

exports.logout = async (req, res) => {
  try {
    await authService.logout(req.user.id);
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
