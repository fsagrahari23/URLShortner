import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";
export const createshortUrlService =async (url,userId)=>{
    const short = generateNanoId(7);
    if(!short) throw new Error("Short url not generated")
    await saveShortUrl(short,url,userId);
    // console.log(url,short);
  return short;
}