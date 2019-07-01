const { AuthenticationError, PubSub } = require("apollo-server");
const Pin = require("./models/Pin");

const pubsub = new PubSub();
const PIN_ADDED = "PIN_ADDED";
const PIN_DELETED = "PIN_DELETED";
const PIN_UPDATED = "PIN_UPDATED";

// This is auth middleware
const authenticated = next => (parent, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }

  return next(parent, args, context, info);
};

module.exports = {
  Query: {
    me: authenticated((parent, args, context, info) => context.currentUser),
    getPins: async (parent, args, context, info) => {
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");
      return pins;
    }
  },
  Mutation: {
    createPin: authenticated(async (parent, args, context, info) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id
      }).save();

      const pinAdded = await Pin.populate(newPin, "author");

      pubsub.publish(PIN_ADDED, { pinAdded });
      return pinAdded;
    }),
    deletePin: authenticated(async (parent, args, context, info) => {
      // exec() return the promise
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      pubsub.publish(PIN_DELETED, { pinDeleted });
      return pinDeleted;
    }),
    createComment: authenticated(async (parent, args, context, info) => {
      const newComment = { text: args.text, author: context.currentUser._id };
      console.log("api createComment", newComment);
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true }
      )
        .populate("author")
        .populate("comments.author");

      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    })
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator(PIN_ADDED)
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator(PIN_DELETED)
    },
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator(PIN_UPDATED)
    }
  }
};
