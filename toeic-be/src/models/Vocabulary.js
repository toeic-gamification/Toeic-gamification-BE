const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vocabulary = sequelize.define("Vocabulary", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Không cho phép trùng lặp
    validate: {
      notEmpty: true, // Không cho phép từ rỗng
    },
    set(value) {
      this.setDataValue("word", value.trim().toLowerCase()); // Xóa khoảng trắng và chuyển về chữ thường
    },
  },
  pronunciation: {
    type: DataTypes.JSON, // Lưu nhiều cách phát âm nếu cần
    validate: {
      isValidIPA(value) {
        if (!Array.isArray(value)) {
          throw new Error("Pronunciation phải là một mảng!");
        }
        value.forEach((ipa) => {
          if (!/^[a-zA-Z0-9\sˈˌːəɪʊɛæʃθðŋʒ]+$/i.test(ipa)) {
            throw new Error(`"${ipa}" không phải là ký tự IPA hợp lệ!`);
          }
        });
      },
    },
  },
  partOfSpeech: {
    type: DataTypes.ENUM(
      "noun",
      "verb",
      "adjective",
      "adverb",
      "preposition",
      "conjunction",
      "interjection",
      "determiner",
      "pronoun"
    ),
    allowNull: false,
  },
  meaningCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Đếm số nghĩa của từ để tối ưu truy vấn
  },
});

module.exports = Vocabulary;
