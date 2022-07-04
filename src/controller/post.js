const postService = require('../service/postService');

const addPost = async (req, res) => {
  const newPost = req.body;
  const { id } = req.user;
  const result = await postService.addPost(newPost, id);
  res.status(201).json(result);
};

module.exports = {
  addPost,
};
