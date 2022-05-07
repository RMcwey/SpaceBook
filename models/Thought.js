const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

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
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

reactionSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`
  })
 

  // userSchema
  // .virtual('fullName')
  // // Getter
  // .get(function () {
  //   return `${this.first} ${this.last}`;
  // })
  // // Setter to set the first and last name
  // .set(function (v) {
  //   const first = v.split(' ')[0];
  //   const last = v.split(' ')[1];
  //   this.set({ first, last });
  // });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
