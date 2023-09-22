const dbConfig = {
  databaseName: "Talent",
  expire: "7d",
  message: {
    serverError: "Server ecxeption. Please contact administrator!",
    notExist: "Not Exist",
  },
  collection: {
    user_profile: "user_profile",
  },
};

export default dbConfig;
