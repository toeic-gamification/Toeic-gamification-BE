const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./User");
const Vocabulary = require("./Vocabulary");
const Meaning = require("./Meaning");
const VocabularyMeaning = require("./VocabularyMeaning");
const Clan = require("./Clan");
const Lesson = require("./Lesson");
const Course = require("./Course");
const Anwser = require("./Anwser");
const Question = require("./Question");
const Test = require("./Test");
d;
const Result = require("./Result");
const Reward = require("./Reward");
const Game = require("./Game");
const Progress = require("./Progress");
const Item = require("./Item");
const Transaction = require("./Transaction");

const Role = require("./Role");

// Thêm các vai trò mặc định
const addRoles = async () => {
  try {
    const roles = ["admin", "teacher", "student"];
    for (const roleName of roles) {
      const role = await Role.findOne({ where: { name: roleName } });
      if (!role) {
        await Role.create({
          name: roleName,
          description: `${
            roleName.charAt(0).toUpperCase() + roleName.slice(1)
          } role`,
        });
        console.log(`✅ Đã thêm role: ${roleName}`);
      }
    }
  } catch (error) {
    console.error("❌ Lỗi khi thêm role:", error);
  }
};

// Thêm từ vựng và nghĩa
const addVocabulary = async () => {
  try {
    const vocabularies = [
      { word: "apple", pronunciation: "/ˈæpl/", partOfSpeech: "noun" },
      { word: "banana", pronunciation: "/bəˈnænə/", partOfSpeech: "noun" },
      { word: "orange", pronunciation: "/ˈɔːrɪndʒ/", partOfSpeech: "noun" },
      { word: "grape", pronunciation: "/ɡreɪp/", partOfSpeech: "noun" },
      { word: "run", pronunciation: "/rʌn/", partOfSpeech: "verb" },
      { word: "quickly", pronunciation: "/ˈkwɪkli/", partOfSpeech: "adverb" },
      {
        word: "beautiful",
        pronunciation: "/ˈbjuːtɪfəl/",
        partOfSpeech: "adjective",
      },
    ];

    for (const vocab of vocabularies) {
      const [word, created] = await Vocabulary.findOrCreate({
        where: { word: vocab.word },
        defaults: vocab,
      });
      if (created) {
        console.log(`✅ Đã thêm từ vựng: ${vocab.word}`);
      }
    }

    const meanings = [
      {
        definition: "A sweet red or green fruit",
        example: "I ate an apple for breakfast.",
      },
      {
        definition: "A long yellow fruit",
        example: "Bananas are rich in potassium.",
      },
      {
        definition: "A round citrus fruit",
        example: "Oranges are full of vitamin C.",
      },
      {
        definition: "To move fast on foot",
        example: "She runs every morning.",
      },
      {
        definition: "Done in a short time",
        example: "He ran quickly to catch the bus.",
      },
      {
        definition: "Very attractive",
        example: "She looks beautiful in that dress.",
      },
    ];

    for (const meaning of meanings) {
      await Meaning.create(meaning);
      console.log(`✅ Đã thêm nghĩa: ${meaning.definition}`);
    }
  } catch (error) {
    console.error("❌ Lỗi khi thêm từ vựng:", error);
  }
};

// Thêm câu hỏi mẫu
const addQuestions = async () => {
  try {
    const questions = [
      {
        content: "What is the capital of France?",
        correctAnswer: "Paris",
        examId: null,
      },
      {
        content: "How many legs does a spider have?",
        correctAnswer: "8",
        examId: null,
      },
      {
        content: "Which planet is known as the Red Planet?",
        correctAnswer: "Mars",
        examId: null,
      },
      { content: "What is 5 + 3?", correctAnswer: "8", examId: null },
    ];

    for (const question of questions) {
      await Question.create(question);
      console.log(`✅ Đã thêm câu hỏi: ${question.content}`);
    }
  } catch (error) {
    console.error("❌ Lỗi khi thêm câu hỏi:", error);
  }
};

// Hàm khởi tạo database
const initDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Cập nhật schema mà không làm mất dữ liệu
    console.log("🚀 Database đã đồng bộ!");

    await addRoles(); // Thêm role mặc định
    await addVocabulary(); // Thêm dữ liệu từ vựng
    await addQuestions(); // Thêm câu hỏi
  } catch (error) {
    console.error("❌ Lỗi khi khởi tạo database:", error);
  }
};

module.exports = {
  User,
  Vocabulary,
  Meaning,
  VocabularyMeaning,
  Clan,
  Question,
  Test,
  Reward,
  Role,
  initDB,
};
