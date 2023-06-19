const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


// GET ELEMENT HTML
const playlist = $('#playlist')
const playControlWrapper = $('.play-control-wrapper')
const songContainer = $('.playlist-song-container')
const togglePlayBtn = $('.btn-toggle-play')
const repeatBtn = $('.btn-repeat')
const playBtn = $('.btn-toggle-play .play-btn')
const pauseBtn = $('.btn-toggle-play .pause-btn')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const audio = $('.current-song')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const progressRange = $('.progress')
const currentTime = $('.current-time p')
const durationTime = $('.duration p')

let indexCurrentSong = 0
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }
const app = {
    listSongs: [
        {
            name: 'Kiếp Má Hồng',
            singer: 'TLong',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/9/2/2/d922bc6bb76d3cbf319b2877a199ef6f.jpg',
            src: 'https://vnso-zn-5-tf-mp3-320s1-zmp3.zmdcdn.me/c76678ec11adf8f3a1bc/2082865505935552357?authen=exp=1687342294~acl=/c76678ec11adf8f3a1bc/*~hmac=3e0c7724c94a2fdefc1a998d26fb1369&fs=MTY4NzE2OTQ5NDmUsICxNnx3ZWJWNnwxMDIzODA1MTA2fDExNS43OC4xMi45Mg',
        },
        {
            name: 'Tòng Phu',
            singer: 'Keyo',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg',
            src: 'https://vnso-zn-16-tf-mp3-320s1-zmp3.zmdcdn.me/a7d1d213ee53070d5e42/2981457658227013023?authen=exp=1687342147~acl=/a7d1d213ee53070d5e42/*~hmac=80d274fa106bb9de536e36ac1126253f&fs=MTY4NzE2OTM0NzgxMnx3ZWJWNnwxMDAyMTgyMTA3fDExOC43MC4xMjYdUngMjAx',
        },
        {
            name: 'Đưa Em Về Nhà',
            singer: 'Grey D',
            image: './assets/images/duaemvenha.jpg',
            src: './assets/song/DuaEmVeNha.mp3',
        },
        {
            name: 'Gió',
            singer: 'Jank',
            image: './assets/images/gio-jank.jpg',
            src: './assets/song/Gio.mp3',
        },
        {
            name: 'Mưa Tháng Sáu',
            singer: 'Vân Mai Hương',
            image: './assets/images/muathangsau.jpg',
            src: './assets/song/MuaThangSau.mp3',
        },
        {
            name: 'Thương Là Đau',
            singer: 'Linh Hương Luz',
            image: './assets/images/thuongladau.jpg',
            src: './assets/song/Thuong-La-Dau.mp3',
        },
        {
            name: 'Đưa Em Về Nhà 2',
            singer: 'Grey D',
            image: './assets/images/duaemvenha.jpg',
            src: './assets/song/DuaEmVeNha.mp3',
        },
        {
            name: 'Gió 2',
            singer: 'Jank',
            image: './assets/images/gio-jank.jpg',
            src: './assets/song/Gio.mp3',
        },
        {
            name: 'Mưa Tháng Sáu 2',
            singer: 'Vân Mai Hương',
            image: './assets/images/muathangsau.jpg',
            src: './assets/song/MuaThangSau.mp3',
        },
        {
            name: 'Thương Là Đau 2',
            singer: 'Linh Hương Luz',
            image: './assets/images/thuongladau.jpg',
            src: './assets/song/Thuong-La-Dau.mp3',
        },
        {
            name: 'Tòng Phu',
            singer: 'Keyo',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg',
            src: 'https://vnso-zn-23-tf-mp3-320s1-zmp3.zmdcdn.me/1eb180f561b488ead1a5/8186882552713682813?authen=exp=1686987159~acl=/1eb180f561b488ead1a5/*~hmac=89022e29d58f4e1c12a9bbe2a43a405f&fs=MTY4NjgxNDM1OTQ2OXx3ZWJWNnwwfDEyMy4yMS45MC4yNDM',
        },
        {
          src: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/1.mp3',
          name: 'Yıldız Tozu',
          singer: 'Ozbi',
          image: "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/2.mp3',
          name: 'You\'re Somebody Else',
          singer: 'flora cash',
          image: "https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/3.mp3',
          name: 'Powerless',
          singer: 'Linkin Park',
          image: "https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/4.mp3',
          name: 'Seni Dert Etmeler',
          singer: 'Madrigal',
          image: "https://www.radyomega.fm/wp-content/uploads/2020/04/MADRIGAL-600.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/5.mp3',
          name: 'Ederlezi',
          singer: 'Solomun',
          image: "https://m.media-amazon.com/images/I/616t0841uvL._SS500_.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/saranshbhardwaj1999/audio/main/Justin_Bieber_Anyone.mp3',
          name: 'Anyone',
          singer: 'Justin Bieber',
          image: "http://universalmusic.at/website2016/wp-content/uploads/2021/01/jb_anyone-single-image_hr-1024x1024.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/saranshbhardwaj1999/audio/main/Justin_Bieber_Hold_On.mp3',
          name: 'Hold On',
          singer: 'Justin Bieber',
          image: "https://www.36vibes.com.ng/wp-content/uploads/2021/03/Justin-bieber-hold-on.jpg",
        },
        {
          src: 'https://raw.githubusercontent.com/saranshbhardwaj1999/audio/main/Jon_Bellion_All_Time_Low.mp3',
          name: 'All Time Low',
          singer: 'Jon Bellion',
          image: "https://www.teahub.io/photos/full/251-2512846_all-time-low-jon-bellion-album-art.jpg",
        },
    ],
    loadSong: function() {
        const _this = this
        const currentSong = `
            <h3 class="dassboard-song-name">${this.listSongs[indexCurrentSong].name}</h3>
            <p class="dassboard-song-singer">${this.listSongs[indexCurrentSong].singer}</p>
        `
        const dassboardSongInfo = $('.dassboard-song-info')
        dassboardSongInfo.innerHTML = currentSong

        const cdThumb = $('.cd-thumb-img')
        cdThumb.style.backgroundImage = `url(${this.listSongs[indexCurrentSong].image})`

        audio.src = this.listSongs[indexCurrentSong].src

        audio.addEventListener('loadedmetadata', function() {
            durationTime.innerHTML = _this.secondToMinute(audio.duration)
        })

        document.title = `${this.listSongs[indexCurrentSong].name} - Music Player`
        this.playPauseSong()

    },
    loadPlaylist: function () {
        const playList = this.listSongs.map(listSong => {
            return `   
                <div class="playlist-song ">
                    <div class="playlist-song-info">
                        <h3 class="playlist-song-name">${listSong.name}</h3>
                        <p class="playlist-song-singer">${listSong.singer}</p>
                    </div>
                    <div class="playlist-song-time">...</div>
                </div>
            `
        })
        songContainer.innerHTML = playList.join('')
        // this.loadTimePlaylist()
    },
    loadTimePlaylist: function() {
        const _this = this
        const playlistSongTimer = $$('.playlist-song-time')

        console.log(playlistSongTimer)
        this.listSongs.forEach((listSong, index) => {
            const newAudio = new Audio((`${listSong.src}`))
            newAudio.addEventListener("loadedmetadata", function() {
                const timeInSeconds = newAudio.duration
                playlistSongTimer[index].innerHTML = _this.secondToMinute(timeInSeconds)
            })
        })
    },
    secondToMinute: function(secondsInput) {
        const secondsInputFloor = Math.floor(secondsInput)
        const minutes = Math.floor(secondsInputFloor / 60);
        let seconds = secondsInputFloor % 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        return `${minutes}:${seconds}`
    },
    playPauseSong: function() {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
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
    },
    activePlaylistSong: function() {
        const playListSong = $$('#playlist .playlist-song')
        $('.playlist-song.active').classList.remove('active')
        playListSong[indexCurrentSong].classList.add('active')
    },

    handleEvents: function() {
        const playListSong = $$('#playlist .playlist-song')
        const _this = this

        togglePlayBtn.onclick = _this.playPauseSong

        // Xử lý xoay cd
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,  // 10s
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý thu nhỏ / phóng to cd khi scroll
        // const cdWidth = cdThumb.offsetWidth
        // const cdHight = cdThumb.offsetHight
        // songContainer.onscroll = function() {
        //     const scrollTop = songContainer.offsetTop
        //     console.log(scrollTop)
        //     cdThumb.style.width = cdWidth - scrollTop + 'px'
        //     cdThumb.style.height = cdWidth - scrollTop + 'px'
        // }

        // Khi audio đang phát
        audio.onplay = function() {
            cdThumbAnimate.play()
            cd.classList.add('playing')
            playBtn.classList.add("display-none")
            pauseBtn.classList.remove("display-none")
        }
        // Khi audio ngừng phát
        audio.onpause = function() {
            cdThumbAnimate.pause()
            cd.classList.remove('playing')
            playBtn.classList.remove("display-none")
            pauseBtn.classList.add("display-none")
        }

        // Thay đổi currentTime và progress audio
        let isProgressChanging = false
        audio.ontimeupdate = function() {
            const currentTimePercent = audio.currentTime / audio.duration * 100
            if (audio.play && !isProgressChanging) {
                progressRange.value = isNaN(currentTimePercent) ? 0 : currentTimePercent
            }
            currentTime.innerHTML = _this.secondToMinute(audio.currentTime)
        }

        progressRange.onchange = function(e) {
            const currentTime = e.target.value / 100 * audio.duration
            audio.currentTime = isNaN(currentTime) ? 0 : currentTime
        }
        progressRange.onmousedown  = function(e) {
            isProgressChanging = true
            console.log(isProgressChanging)
        }
        progressRange.onmouseup  = function(e) {
            isProgressChanging = false
            console.log(isProgressChanging)
        }
        progressRange.ontouchstart  = function(e) {
            isProgressChanging = true
            console.log(isProgressChanging)
        }
        progressRange.ontouchend  = function(e) {
            isProgressChanging = false
            console.log(isProgressChanging)
        }

        // Xử lý khi nhấn nút bài trước đó
        prevBtn.onclick = function() {
            if (randomBtn.classList.contains("active")) {
                _this.randomSong()
            } else if (indexCurrentSong == 0) {
                indexCurrentSong = _this.listSongs.length-1
            } else {
                indexCurrentSong--
            }
            _this.loadSong()
            _this.activePlaylistSong()
            // $('.playlist-song.active').scrollIntoView()
        }

        // Xử lý khi nhấn nút bài tiếp theo
        nextBtn.onclick = function() {
            if (randomBtn.classList.contains("active")) {
                _this.randomSong()
            } else if (indexCurrentSong == _this.listSongs.length-1) {
                indexCurrentSong = 0
            } else {
                indexCurrentSong++
            }
            _this.loadSong()
            _this.activePlaylistSong()
            $('.playlist-song.active').scrollIntoView()

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
                    _this.activePlaylistSong()
                } else {
                    indexCurrentSong++
                    _this.loadSong()
                    _this.activePlaylistSong()
                }
            }
            _this.activePlaylistSong()
          });
        
        playListSong[indexCurrentSong].classList.add('active')
        
        playListSong.forEach((song, index) => {
            song.onclick = function() {
                $('.playlist-song.active').classList.remove('active')
                this.classList.add('active')
                indexCurrentSong = index
                _this.loadSong()
            }
        })
    },

    start: function() {
        this.loadSong()
        this.loadPlaylist()
        this.handleEvents()
    }
}
app.start()
