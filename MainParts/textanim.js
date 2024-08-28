const artistElement = document.getElementById('artist');

function updateArtistText() {

  
  // Calculate the animation duration based on the text length
  const textWidth = artistElement.scrollWidth;
  const containerWidth = artistElement.parentElement.clientWidth;
  const duration = textWidth / containerWidth * 8; // Adjust the multiplier for speed
  
  artistElement.style.animationDuration = `${duration}s`;
}

// Example usage
updateArtistText();
