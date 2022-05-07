const connection = require('../config/connection');
const { Thought, User } = require('../models');
const userData = require('./userData');
const thoughtData = require('./thoughtData');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Add users to the collection and await the results
  await User.collection.insertMany(userData);

  // Add thoughts to the collection and await results
  await Thought.collection.insertMany(thoughtData)

  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.table(thoughtData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
