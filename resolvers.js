const user = {
  _id: "1",
  name: "wilson",
  email: "s777610@gmail.com",
  picture: "https://cloudinary.com/asdf"
};

module.exports = {
  Query: {
    me: () => user
  }
};
