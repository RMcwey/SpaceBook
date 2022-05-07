const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const Reaction = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // use getter method
    },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
