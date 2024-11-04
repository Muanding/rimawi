let currentMusic = 0;  
const music = document.querySelector('#audio');  
const seekBar = document.querySelector('.seek-bar'); 
const songName = document.querySelector('.music-name'); 
const artistName = document.querySelector('.artist-name'); 
const disk = document.querySelector('.disk'); 
const currentTime = document.querySelector('.current-time'); 
const musicDuration = document.querySelector('.song-duration'); 
const playBtn = document.querySelector('.play-btn'); 
const forwardBtn = document.querySelector('.forward-btn'); 
const backwardBtn = document.querySelector('.backward-btn'); 

playBtn.addEventListener('click', () => {     
    if(playBtn.className.includes('pause')) {         
        music.play();     
    } else {         
        music.pause();     
    }     
    playBtn.classList.toggle('pause');     
    disk.classList.toggle('play'); 
});

// Setup music   
const setMusic = (i) => {     
    seekBar.value = 0; // Set range slide value to 0     
    let song = songs[i];     
    currentMusic = i;     
    music.src = song.path;     
    music.load(); // Load the new source

    // Update the duration display
    music.addEventListener('loadedmetadata', () => {
        seekBar.max = music.duration; // Set the max value for the seek bar
        musicDuration.innerHTML = formatTime(music.duration);
    });

    songName.innerHTML = song.name;     
    artistName.innerHTML = song.artist;     
    disk.style.backgroundImage = `url('${song.cover}')`; 
}

// Initial setup
setMusic(0);

// Formatting time
const formatTime = (time) => {     
    let min = Math.floor(time / 60);     
    if(min < 10) {         
        min = `0${min}`;     
    }      
    let sec = Math.floor(time % 60);     
    if(sec < 10) {         
        sec = `0${sec}`;     
    }     
    return `${min} : ${sec}`; 
}

// Seek bar event listeners
music.addEventListener('timeupdate', () => {     
    seekBar.value = music.currentTime;     
    currentTime.innerHTML = formatTime(music.currentTime); 
});

seekBar.addEventListener('change', () => {     
    music.currentTime = seekBar.value; 
});

// Play music function
const playMusic = () => {     
    music.play();     
    playBtn.classList.remove('pause');     
    disk.classList.add('play'); 
}

// Forward and backward controls
forwardBtn.addEventListener('click', () => {     
    currentMusic = (currentMusic >= songs.length - 1) ? 0 : currentMusic + 1;     
    setMusic(currentMusic);     
    playMusic(); 
});

backwardBtn.addEventListener('click', () => {     
    currentMusic = (currentMusic <= 0) ? songs.length - 1 : currentMusic - 1;     
    setMusic(currentMusic);     
    playMusic(); 
});

// Next track on end
music.addEventListener('ended', () => {     
    forwardBtn.click(); 
});
