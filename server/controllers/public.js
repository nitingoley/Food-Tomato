const axios = require("axios");
const aufs = require("all-url-file-size");
require("dotenv").config();

exports.startApi = (req, res, next) => {
  res.status(200).json({ message: "Welcome to MediaMate" });
};

// YouTube Handler
exports.postYoutube = async (req, res, next) => {
  const ytUrl = req.body.urls;

  const videoIdMatch = ytUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts|watch)?(?:\?v=|\/)?)([a-zA-Z0-9_-]{11}))/i
  );

  if (!videoIdMatch) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  const videoId = videoIdMatch[1];

  const options = {
    method: "GET",
    url: "https://yt-api.p.rapidapi.com/dl",
    params: { id: videoId },
    headers: {
      "X-RapidAPI-Key": process.env.YT_API_KEY,
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const result = response.data;

    if (result.thumbnail) {
      const dataList = result.formats.map((obj) => ({
        quality: obj.qualityLabel,
        size: (
          (obj.bitrate * (+obj.approxDurationMs / 1000)) / (8 * 1024 * 1024)
        ).toFixed(1), // Size in MB
        url: obj.url,
      }));

      res.status(200).json({
        thumb: result.thumbnail[2].url,
        urls: dataList,
        title: result.title,
      });

      await req.users.addActivity({ yturl: ytUrl });
    } else {
      res.status(403).json({
        status: "fail",
        error: "Sorry, the video may be private or removed.",
        code: 403,
      });
    }
  } catch (error) {
    console.error("API request failed:", error);
    res.status(500).json({
      status: "fail",
      error: "An unexpected error occurred. Please try again later.",
      code: 500,
    });
    next(error);
  }
};

// Twitter Handler
exports.postTwitter = async (req, res, next) => {
  const twUrl = req.body.urls;

  const options = {
    method: "POST",
    url: "https://twitter65.p.rapidapi.com/api/twitter/links",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.TW_API_KEY,
      "X-RapidAPI-Host": "twitter65.p.rapidapi.com",
    },
    data: { url: twUrl },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    const dataUrl = data[0].urls;

    const dataList = await Promise.all(
      dataUrl.map(async (item) => {
        const size = await aufs(item.url, "MB");
        return {
          url: item.url,
          quality: item.subName + "P",
          size: size.toFixed(1),
        };
      })
    );

    res.status(200).json({
      thumb: data[0].pictureUrl,
      urls: dataList,
      title: data[0].meta.title,
    });

    await req.users.addActivity({ twUrl });
  } catch (error) {
    console.error("Error during request:", error);
    res.status(403).json({
      status: "fail",
      error:
        "Sorry, we couldn't locate the video you're looking for. It may be private or removed.",
      code: 403,
    });
    next(error);
  }
};

// Instagram/Facebook Handler
exports.otherPost = async (req, res, next) => {
  const igUrl = req.body.urls;

  const options = {
    method: "GET",
    url: "https://fb-video-reels.p.rapidapi.com/api/getSocialVideo",
    params: { url: igUrl },
    headers: {
      "X-RapidAPI-Key": process.env.IG_API_KEY,
      "X-RapidAPI-Host": "fb-video-reels.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const formats = response.data;
    const videoData = formats.links;

    if (formats.error === true) {
      return res.status(403).json({
        status: "fail",
        error: "Video might be private or removed.",
        code: 403,
      });
    }

    const urls = await Promise.all(
      videoData.map(async (data) => {
        const size = await aufs(data.link, "MB");
        return {
          url: data.link,
          quality: data.quality.toUpperCase() || "720P",
          size: size.toFixed(1), // Size in MB
        };
      })
    );

    res.status(200).json({
      urls,
      message: "Instagram/Facebook video details retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching Instagram/Facebook video:", error);
    res.status(500).json({
      status: "fail",
      error: "An unexpected error occurred. Please try again later.",
      code: 500,
    });
    next(error);
  }
};
