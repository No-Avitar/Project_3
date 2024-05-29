const { AuthenticationError } = require('apollo-server-express');
const { User, Workout } = require('../models');
const { generatetoken } = require('../utils/auth');

const authenticateuser = (context) => {
  if (!context.currentusers) {
    throw new AuthenticationError('Please log in first');
  }
};

const resolvers = {
  Query: {
    currentusers: async (parent, args, context) => {
      authenticateuser(context);
      return User.findOne({ _id: context.currentusers._id }).populate('workoutplan');
    },
    allworkouts: async () => {
      return Workout.find();
    },
    workout: async (parent, { id }) => {
      return Workout.findById(id);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const newuser = await User.create(args);
      const token = generatetoken(newuser);
      return { token, newuser };
    },
    login: async (parent, { email, password }) => {
      const existinguser = await User.findOne({ email });

      if (!existinguser) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isPasswordValid = await existinguser.isCorrectPassword(password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = generatetoken(existinguser);
      return { token, existinguser };
    },
    addworkout: async (parent, args, context) => {
      authenticateuser(context);
      const newexercise = await Workout.create(args);
      await User.findByIdAndUpdate(
        context.currentusers._id,
        { $push: { workoutplan: newexercise._id } },
        { new: true }
      );
      return newexercise;
    },
    updateworkout: async (parent, { id, ...args }, context) => {
      authenticateuser(context);
      return Workout.findByIdAndUpdate(id, args, { new: true });
    },
    deleteworkout: async (parent, { id }, context) => {
      authenticateuser(context);
      return Workout.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;