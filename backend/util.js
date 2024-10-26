
const videos_data = [
  {
    "title": "Coding a Decentralised Exchange in Node.js + Express - Livestream cuts #1",
    "duration": "36 Minutes, 44 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/Wb6MmUa0bu0/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=Wb6MmUa0bu0"
  },
  {
    "title": "How to master WEB3 in 2024 (Complete Roadmap and Syllabus)",
    "duration": "29 Minutes, 4 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/D5CGlFQbgnk/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=D5CGlFQbgnk"
  },
  {
    "title": "I built a WEB3 SAAS in 6 hours (S3, Nextjs, Solana, Web3.js)",
    "duration": "6 Hours, 21 Minutes, 28 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/zi0iR3UN-u0/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=zi0iR3UN-u0"
  },
  {
    "title": "Rust Tutorial for Beginners - Full Course (With Notes and Project Ideas)",
    "duration": "4 Hours, 1 Minutes, 40 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/qP7LzZqGh30/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=qP7LzZqGh30"
  },
  {
    "title": "How to get a High Paying Job in Web3 as a Developer",
    "duration": "12 Minutes, 25 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/gYK8azCYjnU/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=gYK8azCYjnU"
  },
  {
    "title": "Complete Web3 Bootcamp - Learning ETH smart contracts",
    "duration": "1 Hours, 44 Minutes, 35 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/Tvf7CXEjFNU/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=Tvf7CXEjFNU"
  },
  {
    "title": "Complete Web3 Bootcamp to get you a High Paying JOB in 2023",
    "duration": "3 Hours, 59 Minutes, 12 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/ERAxd8gl1Eg/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=ERAxd8gl1Eg"
  },
  {
    "title": "Most Demanding Programming Skill Which Everyone Should LEARN | Web3 or AI or Full Stack?",
    "duration": "17 Minutes, 13 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/WRFbpissttY/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=WRFbpissttY"
  },
  {
    "title": "Making @SinghinUSA 's first Web3 contribution in person",
    "duration": "30 Minutes, 40 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/nOf4on9rm0Y/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=nOf4on9rm0Y"
  },
  {
    "title": "FULL Web3 Roadmap in 2023 (And how to create your own token)",
    "duration": "57 Minutes, 55 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/8NeZgmSfbYg/maxresdefault.jpg",
    "url": "https://www.youtube.com/watch?v=8NeZgmSfbYg"
  },
  {
    "title": "Why web3 developers are paid so much",
    "duration": "18 Minutes, 53 Seconds",
    "thumbnail": "https://i.ytimg.com/vi/OlInubmAAG0/sddefault.jpg",
    "url": "https://www.youtube.com/watch?v=OlInubmAAG0"
  }
]

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
    280
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

function getTotalDuration(videos = videos_data) {
  let totalDuration = 0;
  const durations = videos.map(video => video.duration);
  durations.forEach(duration => {
    const allDuration = duration.match(/\d+/g);
    if (allDuration.length === 3){
      totalDuration += Number(allDuration[0])*60*60;
      totalDuration += Number(allDuration[1])*60;
      totalDuration += Number(allDuration[2]);
    }
    else if (allDuration.length === 2){
      totalDuration += Number(allDuration[0])*60;
      totalDuration += Number(allDuration[1]);
    }
    else if (allDuration.length == 1){
      totalDuration += Number(allDuration[0]);
    }
  })


 return totalDuration;
}

function firstCharToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




module.exports = {formatPlaylistData, getTotalDuration, firstCharToUpper};