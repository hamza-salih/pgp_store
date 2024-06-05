const sequelize = require('./db');
const { DataTypes } = require('sequelize');


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
  
  
  module.exports = {create_product, Product };
  