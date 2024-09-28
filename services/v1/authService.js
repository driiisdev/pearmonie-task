const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const {Users, Tokens, Roles} = require('../../models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

const register = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Users.create({ username, email, password: hashedPassword });
  const userRole = await Roles.findOne({ where: { name: 'User' } });
  await user.addRole(userRole);

  return { id: user.id, username: user.username, email: user.email };
};

const login = async (email, password) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    console.log(`No user found for email: ${email}`);
    throw new Error("Account does not exist");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log(`Invalid password for user: ${email}`);
    throw new Error("Invalid password");
  }
  const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

  await Tokens.create({
    userId: user.id,
    token: accessToken,
    type: 'access',
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });

  await Tokens.create({
    userId: user.id,
    token: refreshToken,
    type: 'refresh',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return { user, accessToken, refreshToken };
};

const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const tokenDoc = await Tokens.findOne({
      where: {
        token: refreshToken,
        type: 'refresh',
        blacklisted: false,
        expires: { [Op.gt]: new Date() }
      }
    });
    if (!tokenDoc) {
      throw new Error('Refresh token not found or has been blacklisted');
    }
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    await Tokens.create({
      userId: user.id,
      token: newAccessToken,
      type: 'access',
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    return { accessToken: newAccessToken };
  } catch (error) {
    throw error;
  }
};

const logout = async (userId) => {
  try {
    const Unexpired = await Tokens.findAll({
      where: {
        userId: userId,
        expires: {
          [Op.gt]: new Date()
        },
        blacklisted: false
      }
    });

    const blacklistToken = Unexpired.map((token) => 
      Tokens.update({ blacklisted: true }, {
        where: { id: token.id }
      })
    );

    await Promise.all(blacklistToken);
  } catch (error) {
    console.error(`Error during logout for user ${userId}:`, error);
    throw error;
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
