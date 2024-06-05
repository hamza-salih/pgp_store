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


const Product = sequelize.define('Product', {
  ProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: { type: DataTypes.STRING, allowNull: false },
  Description: { type: DataTypes.TEXT, allowNull: false },
  Price: { type: DataTypes.FLOAT, allowNull: false },
  Quantity: { type: DataTypes.INTEGER, allowNull: false },
  UserID_FK: { type: DataTypes.INTEGER, allowNull: true },
  Timestamp: { type: DataTypes.DATE, allowNull: false },
  location_from	: { type: DataTypes.STRING, allowNull: false },
  location_to	: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false,
  tableName: 'Products'
});

async function create_product(Name, Description, Price, Quantity, Timestamp, UserID_FK, location_from, location_to){
    try{
      const new_Product = await Product.create({
        Name: Name,
        Description: Description,
        Price: Price,
        Quantity: Quantity,
        Timestamp: Timestamp,
        UserID_FK: UserID_FK,
        location_from: location_from,
        location_to: location_to
      });
      return new_Product;
    }catch(error){
      console.error('Error inserting a product:', error);
      throw error;
    }
}


module.exports = { getUserByUsername, registerUser, create_product, Product };
