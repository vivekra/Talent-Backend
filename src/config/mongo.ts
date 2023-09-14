const dbConfig = {
  databaseName: "Talent",
  expire: 86400 * 7,
  message: {
    serverError: "Server ecxeption. Please contact administrator!",
    notExist: "Not Exist",
  },
  collection: {
    user_profile: "user_profile",
  },
};

export default dbConfig;
