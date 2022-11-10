const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'qwerty1_1',
    email: 'qwerty@email.com',
    password: 'password111'
  },
  {
    username: 'Beto',
    email: 'qwerty2@email.com',
    password: 'password111'
  },
  {
    username: 'AnaMari',
    email: 'qwerty3@email.com',
    password: 'password111'
  },
  {
    username: 'GazPa',
    email: 'qwerty4@email.com',
    password: 'password111'
  },
  {
    username: 'PinkEssay',
    email: 'qwerty5@email.com',
    password: 'password111'
  },
  {
    username: 'karchers',
    email: 'qwerty6@email.com',
    password: 'password111'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
