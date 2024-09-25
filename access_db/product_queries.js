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
  userID: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
          model: 'Users',
          key: 'userID'
      }
  },
  Subject: { type: DataTypes.STRING, allowNull: false },
  CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  UpdatedAt: { type: DataTypes.DATE, allowNull: true },
  Tags: { type: DataTypes.STRING, allowNull: true },
  IsPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  timestamps: false,
  tableName: 'Posts'
});

async function syncModels() {
    await sequelize.sync();
}

syncModels();

async function create_post(Title, Content, userID, Tags, IsPublished, Subject) {
  try {
    console.log({ Title, Content, userID, Tags, Subject, IsPublished });
    const new_Post = await Post.create({
        Title: Title,
        Content: Content,
        userID: userID,
        Tags: Tags,
        IsPublished: IsPublished,
        Subject: Subject
    });
    return new_Post;
  } catch (error) {
    console.error('Error inserting a post:', error);
    throw error;
  }
}

async function delete_post(PostID) {
  try {
    const deletedPost = await Post.destroy({ where: { PostID } });
    return deletedPost;
  } catch (error) {
    console.error('Error deleting the post:', error);
    throw error;
  }
}

async function update_post(PostID, updatedData) {
  try {
    const [updated] = await Post.update(updatedData, { where: { PostID } });
    return updated;
  } catch (error) {
    console.error('Error updating the post:', error);
    throw error;
  }
}

async function get_post_by_id(PostID) {
  try {
    const post = await Post.findByPk(PostID);
    return post;
  } catch (error) {
    console.error('Error fetching the post:', error);
    throw error;
  }
}

module.exports = { create_post, delete_post, update_post, get_post_by_id, Post };
