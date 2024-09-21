const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('Post', {
  PostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  Title: { type: DataTypes.STRING, allowNull: false },
  Content: { type: DataTypes.TEXT, allowNull: false },
  AuthorID: { type: DataTypes.INTEGER, allowNull: false },
  Subject: { type: DataTypes.STRING, allowNull: false }, // Add Subject field
  CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  UpdatedAt: { type: DataTypes.DATE, allowNull: true },
  Tags: { type: DataTypes.STRING, allowNull: true },
  IsPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  timestamps: false,
  tableName: 'Posts'
});

async function create_post(Title, Content, AuthorID, Tags, IsPublished, Subject) {
  try {
    console.log({ Title, Content, AuthorID, Tags, Subject, IsPublished });
      const new_Post = await Post.create({
          Title: Title,
          Content: Content,
          AuthorID: AuthorID,
          Tags: Tags,
          IsPublished: IsPublished,
          Subject: Subject // Include Subject in the creation
      });
      return new_Post;
  } catch (error) {
      console.error('Error inserting a post:', error);
      throw error;
  }
}

module.exports = { create_post, Post };
