const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
// Songs
const songs = [
    {
        title: "Dorriyan💔🎶.mp3",
        artist: "Free Music",
        src: "songs/Dorriyan.mp3",
    },
    {
        title: "Jab sa tumko dheka❤️🎶.mp3",
        artist: "Free Music",
        src: "songs/Jab sa tumko dheka.mp3",
    },
    {
        title: "Tum hi ho💝🎶.mp3",
        artist: "Free Music",
        src: "songs/Tum hi ho.mp3",
    }
];
let currentSong = 0;
let shuffle = false;
let repeat = false;
// Load song
function loadSong() {
    const song = songs[currentSong];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    updatePlaylist();
}
// Play
function playSong() {
    audio.play()
        .then(() => {
            playBtn.textContent = "⏸";
        })
        .catch(() => {
            console.log("Audio could not be played.");
        });
}
// Pause
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}
// Play / Pause
playBtn.addEventListener("click", function () {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});
// Next
nextBtn.addEventListener("click", function () {
    nextSong();
});
// Previous
prevBtn.addEventListener("click", function () {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong();
    playSong();
});
// Next song function
function nextSong() {

    if (shuffle) {

        let newSong;

        do {
            newSong = Math.floor(Math.random() * songs.length);
        } while (newSong === currentSong && songs.length > 1);

        currentSong = newSong;

    } else {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }
    }

    loadSong();
    playSong();
}
// Update progress
audio.addEventListener("timeupdate", function () {

    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;
    }

    currentTime.textContent =
        formatTime(audio.currentTime);
});
// Show duration
audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);
});
// Progress bar
progress.addEventListener("input", function () {

    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});
// Volume
volume.addEventListener("input", function () {
    audio.volume = volume.value;
});
// Shuffle button
shuffleBtn.addEventListener("click", function () {

    shuffle = !shuffle;

    shuffleBtn.classList.toggle("active");
});
// Repeat button
repeatBtn.addEventListener("click", function () {

    repeat = !repeat;

    repeatBtn.classList.toggle("active");
});
// When song ends
audio.addEventListener("ended", function () {

    if (repeat) {

        audio.currentTime = 0;
        playSong();

    } else {

        nextSong();
    }
});
// Create playlist
function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function (song, index) {

        const item = document.createElement("div");

        item.className = "playlist-item";

        item.textContent =
            (index + 1) + ". " + song.title;

        item.addEventListener("click", function () {

            currentSong = index;

            loadSong();
            playSong();
        });

        playlist.appendChild(item);
    });
}
// Highlight current song
function updatePlaylist() {

    const items =
        document.querySelectorAll(".playlist-item");

    items.forEach(function (item, index) {

        item.classList.toggle(
            "active",
            index === currentSong
        );
    });
}
// Convert seconds to minutes
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsLeft =
        Math.floor(seconds % 60);

    return minutes + ":" +
        (secondsLeft < 10 ? "0" : "") +
        secondsLeft;
}
// Start player
createPlaylist();
loadSong();

audio.volume = 1;