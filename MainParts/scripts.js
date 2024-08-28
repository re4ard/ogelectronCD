const audioPlayer = document.getElementById('audioPlayer');
const waves = document.querySelectorAll('.wave');
const progressContainer = document.querySelector('.musicbarcon');
const progressBar = document.getElementById('progress');
const startTimeDisplay = document.getElementById('starttime');
const endTimeDisplay = document.getElementById('endtime');
const mp3Folder = 'D:'; // Adjust the path to your MP3 folder
const trackListPath = 'tracks.json'; // Path to the JSON file containing track list
let currentSongIndex = 0;
let isAudioPlaying = false;
let trackList; // Variable to store the track list

function playAudio() {
  console.log("Attempting to play audio");
  if (!isAudioPlaying) {
    const track = trackList[currentSongIndex];
    const filePath = track.file; // File path from the track object
    const title = track.title; // Title of the current song
    const artist = track.artist; // Artist of the current song
    waves.forEach(wave => wave.style.animationPlayState = 'running');

    // Update the title and artist display
    updateTitleAndArtist(title, artist);

    // Set the audio source
    audioPlayer.src = filePath;

    // Play the audio directly
    audioPlayer.play()
      .then(() => {
        console.log("Audio Played: " + title);
        isAudioPlaying = true;
      })
      .catch(error => {
        console.error("Error playing audio:", error);
      });
  } else {
    audioPlayer.play();
  }

  // Update the end time display with the duration of the song
  audioPlayer.onloadedmetadata = function() {
    endTimeDisplay.textContent = formatTime(audioPlayer.duration);
  };
}

function pauseAudio() {
  audioPlayer.pause();
  waves.forEach(wave => wave.style.animationPlayState = 'paused');
  console.log("Audio Paused");
}
// Update the initial state based on whether the audio is playing or not
audioPlayer.addEventListener('play', () => {
  waves.forEach(wave => wave.style.animationPlayState = 'running');
});

audioPlayer.addEventListener('pause', () => {
  waves.forEach(wave => wave.style.animationPlayState = 'paused');
});

audioPlayer.addEventListener('ended', () => {
  waves.forEach(wave => wave.style.animationPlayState = 'paused');
});
function stopAudio() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  console.log("Audio Stopped");
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % trackList.length; // Increment the index for the next song
  const nextSong = trackList[currentSongIndex];
  updateTitleAndArtist(nextSong.title, nextSong.artist); // Update the title and artist display
  audioPlayer.src = nextSong.file; // Set the audio source for the next song
  playAudio(); // Play the next song
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + trackList.length) % trackList.length; // Decrement the index for the previous song
  const previousSong = trackList[currentSongIndex];
  updateTitleAndArtist(previousSong.title, previousSong.artist); // Update the title and artist display
  audioPlayer.src = previousSong.file; // Set the audio source for the previous song
  playAudio(); // Play the previous song
}

// Function to update title and artist display
function updateTitleAndArtist(title, artist) {
  document.getElementById('title').textContent = title;
  document.getElementById('artist').textContent = artist;
}

// Update the progress bar and start time as the audio plays
audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const { duration, currentTime } = audioPlayer;
  const percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
  startTimeDisplay.textContent = formatTime(currentTime);
}

// Seek within the audio when clicking on the progress bar
function seek(event) {
  const width = progressContainer.clientWidth;
  const clickX = event.offsetX;
  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
}

// Event listener for the end of the audio track
audioPlayer.addEventListener('ended', function() {
  playNextSong();
});



// Load the track list and start playing the initial song
fetch(trackListPath)
  .then(response => response.json())
  .then(data => {
    trackList = data;
    playAudio();
    console.log("Initial Song Played: " + trackList[currentSongIndex].title);
  })
  .catch(error => {
    console.error('Error loading track list:', error);
  });

// Function to format time in minutes:seconds
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
