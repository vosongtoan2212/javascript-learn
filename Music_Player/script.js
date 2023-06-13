const listSongs = [
    {
        name: 'Đưa Em Về Nhà',
        singer: 'Grey D',
        image: 'duaemvenha.jpg',
        src: 'DuaEmVeNha.mp3',
    },
    {
        name: 'Gió',
        singer: 'Jank',
        image: 'gio-jank.jpg',
        src: 'Gio.mp3',
    },
    {
        name: 'Mưa Tháng Sáu',
        singer: 'Vân Mai Hương',
        image: 'muathangsau.jpg',
        src: 'MuaThangSau.mp3',
    },
    {
        name: 'Thương Là Đau',
        singer: 'Linh Hương Luz',
        image: 'thuongladau.jpg',
        src: 'Thuong-La-Dau.mp3',
    },
]


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// GET ELEMENT HTML
const songContainer = $('.song-container')
const togglePlayBtn = $('.btn-toggle-play')
const repeatBtn = $('.btn-repeat')
const playBtn = $('.btn-toggle-play .play-btn')
const pauseBtn = $('.btn-toggle-play .pause-btn')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
// const audio = $('.current-song')

let indexCurrentSong = 0

// FUNCTION
function loadSong() {
    const currentSong = `
        <h3 class="dassboard-song-name">${listSongs[indexCurrentSong].name}</h3>
        <p class="dassboard-song-singer">${listSongs[indexCurrentSong].singer}</p>
    `
    const dassboardSongInfo = $('.dassboard-song-info')
    dassboardSongInfo.innerHTML = currentSong

    const cdThumb = $('.cd-thumb-img')
    cdThumb.style.backgroundImage = `url(./assets/images/${listSongs[indexCurrentSong].image})`;

    audio.src = './assets/song/' + listSongs[indexCurrentSong].src
}
loadSong()

function playPauseSong() {
        if (audio.paused) {
          audio.play();
          playBtn.classList.add("display-none")
          pauseBtn.classList.remove("display-none")
        } else {
          audio.pause();
          playBtn.classList.remove("display-none")
          pauseBtn.classList.add("display-none")
        }
}

function repeatSong() {
    audio.loop = true;
}

function randomSong() {
    indexCurrentSong = Math.floor(Math.random() * listSongs.length)
    loadSong()
    playPauseSong()
}

function activePlaylistSong() {
    $('.song.active').classList.remove('active')
    playListSong[indexCurrentSong].classList.add('active')
}



// HTML DOM PLAYLIST
const playList = listSongs.map(listSong => {
    const audioSong = new Audio(`./assets/song/${listSong.src}`)
    let timer = []

    audioSong.addEventListener("loadedmetadata", function() {
        timer.push(audioSong.duration)
    });
    console.log(timer);
    return `   
        <div class="song">
            <div class="song-info">
                <h3 class="song-name">${listSong.name}</h3>
                <p class="song-singer">${listSong.singer}</p>
            </div>
            <div class="song-time">4:20</div>
        </div>
    `
})
songContainer.innerHTML = playList.join('')


const playListSong = $$('#playlist .song-container .song')


// EVENT
togglePlayBtn.onclick = playPauseSong

prevBtn.onclick = function() {
    if (indexCurrentSong == 0) {
        indexCurrentSong = listSongs.length-1
    } else {
        indexCurrentSong--
    }
    loadSong()
    playPauseSong()
    activePlaylistSong()
}
nextBtn.onclick = function() {
    if (indexCurrentSong == listSongs.length-1) {
        indexCurrentSong = 0
    } else {
        indexCurrentSong++
    }
    loadSong()
    playPauseSong()
    activePlaylistSong()
}

repeatBtn.onclick = function() {
    this.classList.toggle('active')
    randomBtn.classList.remove('active')
}
randomBtn.onclick = function() {
    this.classList.toggle('active')
    repeatBtn.classList.remove('active')
    
}

audio.addEventListener("ended", function() {
    if (repeatBtn.classList.contains("active")) {
        repeatSong()
    } else if (randomBtn.classList.contains("active")) {
        randomSong()
    } else {
        if (indexCurrentSong == listSongs.length-1) {
            indexCurrentSong = 0
            loadSong()
            playPauseSong()
            activePlaylistSong()
        } else {
            indexCurrentSong++
            loadSong()
            playPauseSong()
            activePlaylistSong()
        }
    }
  });



playListSong[indexCurrentSong].classList.add('active')

playListSong.forEach((song, index) => {
    song.onclick = function() {
        $('.song.active').classList.remove('active')
        this.classList.add('active')
        indexCurrentSong = index
        loadSong()
    }
})