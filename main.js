const songs = [

  {
    title: "Alaska",
    artist: "Trivecta",
    audioSrc: "trivecta-alaska.mp3",
    cover: "trivecta.jpg"
  },
  {
    title: "Feels Like",
    artist: "Cerus & Blume",
    audioSrc: "feels-like.mp3",
    cover: "blume.jpg"
  },
  {
    title: "Crying While you're Dancing",
    artist: "Dayseeker",
    audioSrc: "crying-while-dancing.mp3",
    cover: "dayseeker.jpg"
  },
  {
    title: "Running to the sea (Seven lions remix)",
    artist: "Seven Lions",
    audioSrc: "seven-lions-remix.mp3",
    cover: "seven_lions.jpg"
  },
  {
    title: "Burial Plot(Reimagined)",
    artist: "Dayseeker",
    audioSrc: "burial-plot.mp3",
    cover: "dayseeker.jpg"
  }

];

const coverImage = document.getElementById("artistImg");
const songTitle = document.getElementById("title");
const songArtist = document.getElementById("artist");
const previousButton = document.getElementById("previousBtn");
const playButton = document.getElementById("playBtn");
const nextButton = document.getElementById("nextBtn");
const audioPlayer = document.getElementById("audioPlayer");
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration")

function loadSong(index) {
  const song = songs[index];

  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  coverImage.src = song.cover;
  audioPlayer.src = song.audioSrc;
}

let currentSongIndex = 0;

function playSong() {
  audioPlayer.play();
  playButton.innerHTML = '<img src="play_pause_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Pause" class="pause-icon">'
  isPlaying = true;
}

function pauseSong() {
  audioPlayer.pause();
  playButton.innerHTML = '<img src="play_pause_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Play" class="play-icon">';
  isPlaying = false;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

loadSong(currentSongIndex);

nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);

let isPlaying = false;

function togglePlayPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

playButton.addEventListener("click", togglePlayPause);

audioPlayer.addEventListener("ended", nextSong);

audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTime.textContent = formatTime(audioPlayer.currentTime);
    duration.textContent = formatTime(audioPlayer.duration);
  }
});

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
});

audioPlayer.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audioPlayer.duration);
})




