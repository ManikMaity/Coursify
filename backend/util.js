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
  formattedData.titles = data?.video_data?.Title;
  formattedData.description = cleanUpDescription(
    data?.video_data?.Description[0],
    150
  );
  formattedData.thumbnails = data?.video_data["Thumbnail url"];
  formattedData.durations = data?.video_data.Duration;
  formattedData.url = data?.video_data["Video url"];
  return formattedData;
}


module.exports = {formatPlaylistData};