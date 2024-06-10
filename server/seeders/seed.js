const db = require('../config/connection');
const { User, Exercise } = require('../models');
const userSeeds = require('./userSeeds.json');
const exerciseSeeds = require('./exerciseSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Exercise', 'exercises');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < exerciseSeeds.length; i++) {
      const { _id, exerciseAuthor } = await Exercise.create(exerciseSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: exerciseAuthor },
        {
          $addToSet: {
            workoutPlans: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
