const { AuthenticationError } = require('apollo-server-express');
const { User, Workout } = require('../models');
const { signToken } = require('../utils/auth');

const authenticateUser = (context) => {
  if (!context.user) {
    throw new AuthenticationError('Please log in first');
  }
};

const resolvers = {
  Query: {
    currentUser: async (parent, args, context) => {
      authenticateUser(context);
      return User.findOne({ _id: context.user._id }).populate('workoutPlans');
    },
    allWorkouts: async () => {
      return Workout.find();
    },
    workout: async (parent, { id }) => {
      return Workout.findById(id);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args);
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isPasswordValid = await user.isCorrectPassword(password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addWorkout: async (parent, args, context) => {
      authenticateUser(context);
      const newWorkout = await Workout.create(args);
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { workoutPlans: newWorkout._id } },
        { new: true }
      );
      return newWorkout;
    },
    updateWorkout: async (parent, { id, ...args }, context) => {
      authenticateUser(context);
      return Workout.findByIdAndUpdate(id, args, { new: true });
    },
    deleteWorkout: async (parent, { id }, context) => {
      authenticateUser(context);
      return Workout.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;