import shortURL from "../models/shorturl.model.js";
import {
  ConflictError,
  NotFoundError,
} from "../utils/error_handler.js";

// Save new short URL
export const saveShortUrl = async (short, longUrl, userId) => {
  try {
    // Check if short_url already exists
    const existing = await shortURL.findOne({ short_url: short });
    if (existing) {
      throw ConflictError("Short URL already exists");
    }

    const newUrl = new shortURL({
      fullUrl: longUrl,
      short_url: short,
      user:userId,
      createdAt: new Date(),
    });

    if (userId) {
      newUrl.user = userId;
    }

    const savedUrl = await newUrl.save();
    return savedUrl;
  } catch (err) {
    throw err; // Let the route handler catch and pass it to errorHandler
  }
};

// Get short URL and increase click count
export const getShortUrl = async (short_url) => {
  try {
    const url = await shortURL.findOneAndUpdate(
      { short_url },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      throw NotFoundError("Short URL not found");
    }

    return url;
  } catch (err) {
    throw err;
  }
};

export const  getUrlById=async(id)=>{
  const urls = await shortURL.find({user:id});
  return urls
}
