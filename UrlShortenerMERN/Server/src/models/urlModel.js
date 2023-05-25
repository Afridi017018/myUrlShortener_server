const mongoose = require("mongoose")

const UrlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  originalLink: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: false,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
  userId: {
    type: String,
    index: true,
  },
});

UrlSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Url = mongoose.model("urls", UrlSchema);

module.exports = Url;