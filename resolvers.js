const { AuthenticationError } = require("apollo-server");
const Pin = require("./models/Pin");

// This is auth middleware
const authenticated = next => (parent, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }

  return next(parent, args, context, info);
};

module.exports = {
  Query: {
    me: authenticated((parent, args, context, info) => context.currentUser)
  },
  Mutation: {
    createPin: authenticated(async (parent, args, context, info) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id
      }).save();

      const pinAdded = await Pin.populate(newPin, "author");
      return pinAdded;
    })
  }
};
