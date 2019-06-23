const { AuthenticationError } = require("apollo-server");

const user = {
  _id: "1",
  name: "wilson",
  email: "s777610@gmail.com",
  picture: "https://cloudinary.com/asdf"
};

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
  }
};
