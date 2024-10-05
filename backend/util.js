function cleanUpDescription(text, length) {
  const cleanedText = text
    .replace(/https?:\/\/[^\s]+/g, "") // Remove URLs
    .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2600-\u26FF]/g, "") // Remove emojis/special symbols
    .replace(/[0-9:]+/g, "") // Remove timeline numbers
    .replace(/[^a-zA-Z\s?.,]/g, "") // Remove special characters like <>
    .replace(/\s{2,}/g, " ") // Remove extra spaces
    .trim(); // Trim leading/trailing spaces
  return cleanedText.length > length
    ? cleanedText.slice(0, length) + "..."
    : cleanedText;
}

function formatPlaylistData(responseData) {
  const data = responseData.data;
  const formattedData = {};
  formattedData.playlistTitle = data?.title;
  formattedData.description = cleanUpDescription(
    data?.video_data?.Description[0],
    350
  );
  formattedData.videos = [];

  const titles = data?.video_data?.Title;
  const thumbnails = data?.video_data["Thumbnail url"];
  const durations = data?.video_data.Duration;
  const url = data?.video_data["Video url"];

  titles.forEach((title, index) => {
    const tempObj = {
      title,
      duration : durations[index],
      thumbnail : thumbnails[index],
      url : url[index]
    }

    formattedData.videos.push(tempObj);
  })


  return formattedData;
}


module.exports = {formatPlaylistData};