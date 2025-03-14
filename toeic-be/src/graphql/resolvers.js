const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Vocabulary, Clan, Question, Test, Reward } = require("../models");
require("dotenv").config();

const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => await User.findByPk(id),
    vocabularies: async () => await Vocabulary.findAll(),
    vocabulary: async (_, { id }) => await Vocabulary.findByPk(id),
    questions: async (_, { level }) => await Question.findAll({ where: { level } }),
    tests: async () => await Test.findAll(),
    clans: async () => await Clan.findAll(),
    rewards: async () => await Reward.findAll(),
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { ...user.toJSON(), token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Người dùng không tồn tại");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Sai mật khẩu");

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { ...user.toJSON(), token };
    },
    addVocabulary: async (_, { word, meaning, example, level }, { user }) => {
      if (!user) throw new Error("Bạn cần đăng nhập");
      return await Vocabulary.create({ word, meaning, example, level, userId: user.id });
    },
    joinClan: async (_, { userId, clanId }) => {
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User không tồn tại");

      user.clanId = clanId;
      await user.save();
      return user;
    },
    completeTest: async (_, { userId, testId }) => {
      const user = await User.findByPk(userId);
      const test = await Test.findByPk(testId);
      if (!user || !test) throw new Error("Dữ liệu không hợp lệ");

      user.xp += test.xpReward;
      await user.save();
      return user;
    },
    purchaseReward: async (_, { userId, rewardId }) => {
      const user = await User.findByPk(userId);
      const reward = await Reward.findByPk(rewardId);
      if (!user || !reward) throw new Error("Dữ liệu không hợp lệ");

      if (user.coins < reward.cost) throw new Error("Không đủ tiền");
      user.coins -= reward.cost;
      await user.save();
      return user;
    },
  },
};

module.exports = resolvers;
