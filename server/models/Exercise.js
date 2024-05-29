const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const exerciseschema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
  },
});

const workoutschema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  exercises: [exerciseschema],
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Workout = model('Workout', workoutschema);

module.exports = Workout;