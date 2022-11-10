const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Loving it',
    post_id: 1,
    user_id: 6
  },
  {
    comment_text: 'I\'ve already search it',
    post_id: 2,
    user_id: 4
  },
  {
    comment_text: 'Pretty interesnting :)',
    post_id: 3,
    user_id: 5
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
