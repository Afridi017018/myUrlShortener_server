const mongoose = require("mongoose");

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
  userId: {
    type: String,
    required: true,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    index: true,
  },
});


function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear().toString().slice(-2);
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

UrlSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.createdAt = formatDate(ret.createdAt);
    ret.updatedAt = formatDate(ret.updatedAt);
    delete ret._id;
  },
});


const UrlModel = mongoose.model("Url", UrlSchema);

module.exports = UrlModel;
