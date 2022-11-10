const { Post } = require('../models');

const postdata = [
  {
    title: 'What do you think about JS?',
    post_text: 'I think it\'s pretty good',
    user_id: 1
  },
  {
    title: 'What is a computer?',
    post_text: 'Search it on google and paste it here',
    user_id: 2
  },
  {
    title: 'What do you think about CSS and HTML?',
    post_text: 'Very useful, for me',
    user_id: 3
  },
  {
    title: 'Resource for testing your apps',
    post_text: 'This is an Hyperlink ;)',
    user_id: 4
  },
  {
    title: 'How can I start to code?',
    post_text: 'Search tutorials or sing up in a bootcamp',
    user_id: 5
  },
  {
    title: 'Process to keep your code clean?',
    post_text: 'Any advice?',
    user_id: 6
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
