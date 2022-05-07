const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const Reaction = require('./Reaction');
const moment = require('moment')

// Schema to create a thought model
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
      get: (date) => date && moment(date).format('MMMM do yyyy, h:mm:ss a'),
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
    return this.reactions.length
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
