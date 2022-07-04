const Sequelize = require('sequelize');
const config = require('../database/config/config');
const CustomError = require('../utils/CustomError');
const { BlogPost, PostCategory } = require('../database/models');

const sequelize = new Sequelize(config.development);

const addPost = async (newPost, userId) => {
  const { title, content, categoryIds } = newPost;
  try {
    const result = await sequelize.transaction(async (t) => {
      const newBlogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      await Promise.all(categoryIds.map(async (categoryId) => {
        await PostCategory.create(
          { postId: newBlogPost.id, categoryId }, 
          { transaction: t },
        );
      }));
      return newBlogPost;
    });
    return result;
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

module.exports = {
  addPost,
};
