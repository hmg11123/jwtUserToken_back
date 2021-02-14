import User from "../../../model/User";

export default {
 Query: {
  test: async (_, args) => {
   return "test";
  },
  getUser: async (_, args) => {
   try {
    const result = await User.find();

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
};
