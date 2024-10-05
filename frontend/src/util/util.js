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

