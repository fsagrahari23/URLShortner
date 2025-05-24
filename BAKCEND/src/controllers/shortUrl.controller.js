import { getShortUrl } from '../dao/short_url.js';
import { createshortUrlService } from '../services/shortUrl.service.js';
import { BadRequestError, NotFoundError } from '../utils/error_handler.js';

// ✅ URL validation helper
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

// ✅ Controller: Create Short URL
export const createUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url || !isValidUrl(url)) {
      throw BadRequestError('A valid URL is required');
    }

    const short = await createshortUrlService(url, req.user?.id); // optional user
    res.status(201).json({
      success: true,
      message: 'URL created successfully',
      short,
    });
  } catch (error) {
    next(error); // Global error handler will catch
  }
};

// ✅ Controller: Redirect to full URL
export const redirectUrl = async (req, res, next) => {
  try {
    const { short_url } = req.params;
    const url = await getShortUrl(short_url);

    if (!url) {
      throw NotFoundError('Short URL not found');
    }

    let redirectUrl = url.fullUrl;
    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
      redirectUrl = 'https://' + redirectUrl;
    }

    return res.redirect(redirectUrl);
  } catch (err) {
    // console.log(err);
    
    next(err);
  }
};
