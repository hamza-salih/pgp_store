const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  displayName: { type: DataTypes.STRING, allowNull: false },
  Username: { type: DataTypes.STRING, allowNull: false },
  Password: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false },
  Address: { type: DataTypes.TEXT, allowNull: true },
  PGPKey: { type: DataTypes.TEXT, allowNull: false },
  pin: { type: DataTypes.INTEGER, allowNull: false },
  utype: { type: DataTypes.CHAR, allowNull: false }
}, {
  timestamps: false,
  tableName: 'Users'
});


async function getUserByUsername(username) {
  return await User.findOne({ where: { Username: username } });
}

async function registerUser(	displayName, username, password, email, address, pgp_key, pin, utype) {
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const pinString = String(pin);
    const pin_Hashed = await bcrypt.hash(pinString, 10);

    const newUser = await User.create({
      displayName: displayName,
      Username: username,
      Password: hashed_password,
      Email: email,
      Address: address,
      PGPKey: pgp_key,
      pin: pin_Hashed,
      utype: utype
    });
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}
async function getAllUsers() {
  return await User.findAll();
}


async function update_user(userID, updatedData) {
  try {
    const [updatedCount] = await User.update(updatedData, { where: { userID } });
    return updatedCount;
  } catch (error) {
    console.error('Error updating the user:', error);
    throw error;
  }
}

module.exports = { getUserByUsername, registerUser, getAllUsers, update_user };




module.exports = { getUserByUsername, registerUser, getAllUsers };
