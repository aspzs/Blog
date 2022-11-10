const sequelize = require('../config/connection');
const seedPost = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');


const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('----SEED ALL----- \n');
  await seedUsers();
  console.log('----SEED USERS----- \n');
  await seedPost();
  console.log('----SEED POSTS----- \n');
  await seedComments();
  console.log('----SEED COMMENTS----- \n');
  process.exit(0);
};

seedAll();
