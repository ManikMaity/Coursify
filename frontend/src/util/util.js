export function makeTextShorter(text, length = 100) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
}

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export function makeYtEmbedLink(ytLink) {
  const videoId = getId(ytLink);
  return `//www.youtube.com/embed/${videoId}`;
}


export function secToTimeFormat(sec){
  
  const hours = Math.floor(sec / 3600);
  const remainingSeconds = sec % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return `${hours}h ${minutes}m`;
}


export function firstLetterUppercase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

