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
const audio = $('.current-song')



let indexCurrentSong = 0

const app = {
    listSongs: [
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
    ],
    render: function () {
        const playList = this.listSongs.map(listSong => {
            // const audioSong = new Audio(`./assets/song/${listSong.src}`)
            // let timer = []
        
            // audioSong.addEventListener("loadedmetadata", function() {
            //     timer.push(audioSong.duration)
            // });
            // console.log(timer);
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
    },
    loadSong: function() {
        const currentSong = `
            <h3 class="dassboard-song-name">${this.listSongs[indexCurrentSong].name}</h3>
            <p class="dassboard-song-singer">${this.listSongs[indexCurrentSong].singer}</p>
        `
        const dassboardSongInfo = $('.dassboard-song-info')
        dassboardSongInfo.innerHTML = currentSong

        const cdThumb = $('.cd-thumb-img')
        cdThumb.style.backgroundImage = `url(./assets/images/${this.listSongs[indexCurrentSong].image})`;

        audio.src = './assets/song/' + this.listSongs[indexCurrentSong].src
    },
    playPauseSong: function() {
        if (audio.paused) {
          audio.play();
          playBtn.classList.add("display-none")
          pauseBtn.classList.remove("display-none")
        } else {
          audio.pause();
          playBtn.classList.remove("display-none")
          pauseBtn.classList.add("display-none")
        }
    },
    repeatSong: function() {
        audio.loop = true;
    },
    randomSong: function() {
        let randomNumber = Math.floor(Math.random() * this.listSongs.length)
        while (randomNumber == indexCurrentSong) {
            randomNumber = Math.floor(Math.random() * this.listSongs.length)
        }
        indexCurrentSong = randomNumber
        this.loadSong()
        this.playPauseSong()
    },
    activePlaylistSong: function() {
        const playListSong = $$('#playlist .song-container .song')
        $('.song.active').classList.remove('active')
        playListSong[indexCurrentSong].classList.add('active')
    },

    handleEvent: function() {
        const playListSong = $$('#playlist .song-container .song')
        const _this = this
        togglePlayBtn.onclick = _this.playPauseSong
        prevBtn.onclick = function() {
            if (indexCurrentSong == 0) {
                indexCurrentSong = _this.listSongs.length-1
            } else {
                indexCurrentSong--
            }
            _this.loadSong()
            _this.playPauseSong()
            _this.activePlaylistSong()
        }
        nextBtn.onclick = function() {
            if (indexCurrentSong == _this.listSongs.length-1) {
                indexCurrentSong = 0
            } else {
                indexCurrentSong++
            }
            _this.loadSong()
            _this.playPauseSong()
            _this.activePlaylistSong()
        }
        
        repeatBtn.onclick = function() {
            this.classList.toggle('active')
            randomBtn.classList.remove('active')
        }
        randomBtn.addEventListener("click", function() {
            this.classList.toggle('active')
            repeatBtn.classList.remove('active')
            
        })
        
        audio.addEventListener("ended", function() {
            if (repeatBtn.classList.contains("active")) {
                _this.repeatSong()
            } else if (randomBtn.classList.contains("active")) {
                _this.randomSong()
            } else {
                if (indexCurrentSong == _this.listSongs.length-1) {
                    indexCurrentSong = 0
                    _this.loadSong()
                    _this.playPauseSong()
                    _this.activePlaylistSong()
                } else {
                    indexCurrentSong++
                    _this.loadSong()
                    _this.playPauseSong()
                    _this.activePlaylistSong()
                }
            }
            _this.activePlaylistSong()
          });
        
        playListSong[indexCurrentSong].classList.add('active')
        
        playListSong.forEach((song, index) => {
            song.onclick = function() {
                $('.song.active').classList.remove('active')
                this.classList.add('active')
                indexCurrentSong = index
                _this.loadSong()
                _this.playPauseSong()
            }
        })
    },

    start: function() {
        this.render()
        this.loadSong()
        this.handleEvent()
    }

}
app.start()