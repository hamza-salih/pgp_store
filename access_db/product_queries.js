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
    AuthorID: { type: DataTypes.INTEGER, allowNull: false }, // ID of the user who created the post
    CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    UpdatedAt: { type: DataTypes.DATE, allowNull: true },
    Tags: { type: DataTypes.STRING, allowNull: true }, // Optional tags for categorization
    IsPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, // Published status
}, {
    timestamps: false,
    tableName: 'Posts'
});

async function create_post(Title, Content, AuthorID, Tags, IsPublished) {
    try {
        const new_Post = await Post.create({
            Title: Title,
            Content: Content,
            AuthorID: AuthorID,
            Tags: Tags,
            IsPublished: IsPublished
        });
        return new_Post;
    } catch (error) {
        console.error('Error inserting a post:', error);
        throw error;
    }
}

module.exports = { create_post, Post };
