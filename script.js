document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('backgroundMusic');
    const metadata = document.getElementById('metadata');
    const timeElement = document.getElementById('time');
    const playOverlay = document.getElementById('playOverlay');
    const startPlaybackButton = document.getElementById('startPlayback');
    const playPauseButton = document.getElementById('playPauseButton');
    const stopButton = document.getElementById('stopButton');
    const volumeButton = document.getElementById('volumeButton');
    const nextButton = document.getElementById('nextButton');

    const songs = [
        { src: 'music/song1.ogg', artist: 'Unrealty', title: 'Scenial', album: 'Virtual International Space Station' },
        { src: 'music/song2.ogg', artist: 'Unrealty', title: 'Mercury Rain', album: 'Virtual International Space Station' },
        { src: 'music/song3.mp3', artist: 'George Fan, Jonne Valtone', title: 'Tank 1-1', album: 'Insaniquarium' },
        { src: 'music/song4.mp3', artist: 'George Fan, Jonne Valtone', title: 'Tank 2-1', album: 'Insaniquarium' },
        { src: 'music/song5.mp3', artist: 'Philippe Charron', title: 'Danger', album: 'Zuma Deluxe' },
		{ src: 'music/song6.ogg', artist: 'Radix', title: 'Yuki Satellites', },
		{ src: 'music/song7.ogg', artist: 'Necros', title: 'Point Of Departure', },
		{ src: 'music/song8.ogg', artist: 'Horace Wimp', title: 'Hymn to Aurora', },
		{ src: 'music/song9.ogg', artist: 'Jester', title: 'Elysium', },
		{ src: 'music/song10.ogg', artist: 'Captain', title: 'Space Debris', },
    ];

    let currentIndex = getRandomSongIndex();

    function getRandomSongIndex() {
        return Math.floor(Math.random() * songs.length);
    }

    function loadSong(index) {
        audio.src = songs[index].src;
        audio.play();
        updateMetadata(index);
    }

    function updateMetadata(index) {
        const song = songs[index];
        metadata.innerHTML = `Title: ${song.title} <br> Artist: ${song.artist} <br> Album: ${song.album}`;
    }

    function updateTime() {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        updateDigitDisplay(minutes, seconds);
    }

    function updateDigitDisplay(minutes, seconds) {
        function getDigitImageUrl(digit) {
            return `images/${digit}.png`;
        }

        timeElement.innerHTML = `
            <span class="digit" style="background-image: url('${getDigitImageUrl(Math.floor(minutes / 10))}')"></span>
            <span class="digit" style="background-image: url('${getDigitImageUrl(minutes % 10)}')"></span>
            <span class="digit" style="background-image: url('${getDigitImageUrl(Math.floor(seconds / 10))}')"></span>
            <span class="digit" style="background-image: url('${getDigitImageUrl(seconds % 10)}')"></span>
        `;
    }

    audio.addEventListener('ended', function () {
        currentIndex = getRandomSongIndex();
        loadSong(currentIndex);
    });

    startPlaybackButton.addEventListener('click', function () {
        playOverlay.style.display = 'none';
        loadSong(currentIndex);
    });

    playPauseButton.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseButton.style.backgroundImage = 'url("images/play.png")';
        } else {
            audio.pause();
            playPauseButton.style.backgroundImage = 'url("images/pause.png")';
        }
    });

    stopButton.addEventListener('click', function () {
        audio.pause();
        audio.currentTime = 0;
        playPauseButton.style.backgroundImage = 'url("images/play.png")';
    });

    volumeButton.addEventListener('click', function () {
        audio.muted = !audio.muted;
    });

    nextButton.addEventListener('click', function () {
        currentIndex = getRandomSongIndex();
        loadSong(currentIndex);
    });

    audio.addEventListener('timeupdate', updateTime);
});
