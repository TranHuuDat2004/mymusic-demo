// js/player.js (FIXED for data registration)

// --- 3. QUẢN LÝ TRẠNG THÁI PLAYER (Moved to global scope) ---
let allSongsFlat = [], currentQueue = [], currentIndex = -1;
let isShuffle = false, repeatMode = 'none', isVolumeInitialized = false, lastVolume = 0.7;
let showBg = localStorage.getItem('showBg') === 'true';
let audioPlayer; // Will be assigned in DOMContentLoaded

/**
 * CRITICAL FIX: Allows asynchronous pages (like library.js) to register their song data with the player.
 * @param {Array} songs - The flat array of all song objects.
 */
window.registerSongDatabase = (songs) => {
    console.log(`Player received ${songs.length} songs.`);
    allSongsFlat = songs;
};


// --- HÀM TIỆN ÍCH (Moved to global scope for access) ---
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
// Expose to window object so other scripts can use it if needed
window.formatTime = formatTime;

// --- HÀM CẬP NHẬT FAVICON (Global Scope) ---
function updateFavicon(iconUrl) {
    const oldLinks = document.querySelectorAll("link[rel*='icon']");
    oldLinks.forEach(link => link.parentNode.removeChild(link));
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.type = 'image/png';
    newLink.href = iconUrl;
    document.head.appendChild(newLink);
}

// --- HÀM PLAYER CHÍNH (Moved to global scope) ---
function playSongByIndex(index) {
    if (!audioPlayer) return; // Guard against player not being initialized
    if (index < 0 || index >= currentQueue.length) {
        document.title = "MyMusic Player";
        updateFavicon("img/favicon.png");
        return;
    }

    currentIndex = index;
    const songData = currentQueue[currentIndex];

    if ('mediaSession' in navigator) {
        const imageUrl = songData.artUrl || 'img/favicon-512x512.png';
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songData.title || "Không có tiêu đề",
            artist: songData.artistData || "Nghệ sĩ không xác định",
            album: 'MyMusic Player',
            artwork: [
                { src: imageUrl, sizes: '96x96', type: 'image/png' },
                { src: imageUrl, sizes: '128x128', type: 'image/png' },
                { src: imageUrl, sizes: '192x192', type: 'image/png' },
                { src: imageUrl, sizes: '256x256', type: 'image/png' },
                { src: imageUrl, sizes: '384x384', type: 'image/png' },
                { src: imageUrl, sizes: '512x512', type: 'image/png' },
            ]
        });
        // Action handlers are set inside DOMContentLoaded
    }

    document.title = `${songData.title} - ${songData.artistData}`;
    updateFavicon(songData.artUrl || "img/favicon.png");

    // DOM elements for song info - these need to be accessed safely
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');
    const nowPlayingArt = document.getElementById('now-playing-art');
    const npFsTitle = document.getElementById('np-fullscreen-title');
    const npFsArtist = document.getElementById('np-fullscreen-artist');
    const npFsArt = document.getElementById('np-fullscreen-art');
    const likeBtn = document.getElementById('like-btn');

    if (nowPlayingTitle) nowPlayingTitle.textContent = songData.title;
    if (nowPlayingArtist) nowPlayingArtist.textContent = songData.artistData;
    if (nowPlayingArt) nowPlayingArt.src = songData.artUrl;
    if (npFsTitle) npFsTitle.textContent = songData.title;
    if (npFsArtist) npFsArtist.textContent = songData.artistData;
    if (npFsArt) npFsArt.src = songData.artUrl;
    if (likeBtn) likeBtn.classList.toggle('active', !!songData.isFavorite);

    const npFsBg = document.getElementById('np-fullscreen-bg');
    if (npFsBg && showBg) {
        npFsBg.style.backgroundImage = `url('${songData.artUrl}')`;
    }

    audioPlayer.src = songData.audioSrc;
    const playPromise = audioPlayer.play();
    if (playPromise) {
        playPromise.catch(error => {
            if (error.name !== 'AbortError') {
                console.error(`Lỗi khi phát "${songData.title}":`, error);
                if (nowPlayingTitle) nowPlayingTitle.textContent = "Lỗi tải nhạc";
            }
        });
    }
}

// --- EXPOSE FUNCTIONS TO GLOBAL SCOPE (CRITICAL FIX) ---
window.playSongFromData = (clickedSong, playlistContext = null) => {
    // On pages that load data synchronously, allSongsFlat might be empty initially.
    // This fallback ensures it gets populated.
    if (allSongsFlat.length === 0 && typeof ALL_MUSIC_SECTIONS !== 'undefined' && Array.isArray(ALL_MUSIC_SECTIONS)) {
        window.registerSongDatabase(ALL_MUSIC_SECTIONS.flatMap(section => section.songs));
    }

    currentQueue = (playlistContext && Array.isArray(playlistContext)) ? [...playlistContext] : [...allSongsFlat];
    const index = currentQueue.findIndex(song => song.audioSrc === clickedSong.audioSrc);
    if (index === -1) {
        console.warn("Song not found in current queue:", clickedSong);
        return;
    }

    if (isShuffle) {
        const firstSong = currentQueue.splice(index, 1)[0];
        currentQueue.sort(() => Math.random() - 0.5);
        currentQueue.unshift(firstSong);
        playSongByIndex(0);
    } else {
        playSongByIndex(index);
    }
};

window.addCardClickListener = (cardElement) => {
    if (!cardElement) return;
    cardElement.addEventListener('click', () => {
        // This fallback is for pages that load data synchronously (like index.html)
        if (allSongsFlat.length === 0 && typeof ALL_MUSIC_SECTIONS !== 'undefined' && Array.isArray(ALL_MUSIC_SECTIONS)) {
            window.registerSongDatabase(ALL_MUSIC_SECTIONS.flatMap(section => section.songs));
        }
        
        const clickedSong = allSongsFlat.find(song => song.audioSrc === cardElement.dataset.src);
        if (clickedSong) {
            window.playSongFromData(clickedSong);
        } else {
            console.warn("Could not find song data for card:", cardElement.dataset);
        }
    });
};


// This listener now handles DOM manipulation and event binding
document.addEventListener('DOMContentLoaded', () => {
    console.log("Player DOMContentLoaded Start");

    // --- 1. TẠO VÀ CHÈN HTML CHO CÁC THÀNH PHẦN PLAYER ---
    const playerContainer = document.getElementById('player-bar-container');
    const fullscreenPlayerContainer = document.getElementById('now-playing-fullscreen-container');

    if (!playerContainer || !fullscreenPlayerContainer) {
        console.warn("Không tìm thấy container cho player hoặc màn hình fullscreen.");
        return;
    }

    // A. HTML cho Player Bar
    const playerBarHTML = `
        <div class="song-info">
            <img src="img/favicon.png" alt="Now Playing" id="now-playing-art">
            <div class="text-details">
                <h4 id="now-playing-title">Chưa có nhạc</h4>
                <p id="now-playing-artist">Chọn một bài hát</p>
            </div>
            <div class="actions">
                <button id="like-btn" title="Thích"><svg viewBox="0 0 24 24" width="18" height="18" class="icon-like"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></button>
            </div>
        </div>
        <div class="player-controls">
            <div class="buttons">
                <button id="shuffle-btn"><svg viewBox="0 0 24 24" width="20" height="20" class="icon-shuffle"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></svg></button>
                <button id="prev-btn"><svg viewBox="0 0 24 24" width="20" height="20" class="icon-prev"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg></button>
                <button class="play-pause-btn" id="main-play-pause-btn"><svg viewBox="0 0 24 24" width="24" height="24" class="icon-play"><path d="M8 5v14l11-7z"></path></svg></button>
                <button id="next-btn"><svg viewBox="0 0 24 24" width="20" height="20" class="icon-next"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg></button>
                <button id="repeat-btn"><svg viewBox="0 0 24 24" width="20" height="20" class="icon-repeat"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></svg></button>
            </div>
            <div class="progress-bar-container">
                <span id="current-time">0:00</span>
                <input type="range" id="progress-bar" min="0" max="100" value="0" title="Thanh tiến trình">
                <span id="total-time">0:00</span>
            </div>
        </div>
        <div class="other-controls">
            <button id="volume-btn"><svg viewBox="0 0 24 24" width="18" height="18" class="icon-volume"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
            <div class="volume-bar-container"><input type="range" id="volume-bar" min="0" max="100" value="70" title="Thanh âm lượng"></div>
            <button id="toggle-bg-btn"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 6v12c3.31 0 6-2.69 6-6s-2.69-6-6-6zM5 12c0-3.87 3.13-7 7-7V3c-4.97 0-9 4.03-9 9s4.03 9 9 9v-2c-3.87 0-7-3.13-7-7z"></path></svg></button>
        </div>
    `;
    playerContainer.className = 'player-bar';
    playerContainer.innerHTML = playerBarHTML;

    // B. HTML cho màn hình Now Playing Fullscreen
    const fullscreenPlayerHTML = `
        <div class="np-fullscreen-bg" id="np-fullscreen-bg"></div>
        <div class="np-fullscreen" id="now-playing-fullscreen">
            <button class="np-close-btn" id="np-close-btn" title="Đóng"><svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button>
            <div class="np-left">
                <div class="np-art-wrapper"><img src="img/favicon.png" alt="Album Art" id="np-fullscreen-art"></div>
            </div>
            <div class="np-right">
                <div class="np-details">
                    <h2 id="np-fullscreen-title">Chưa có nhạc</h2>
                    <p id="np-fullscreen-artist">Chọn một bài hát</p>
                </div>
                <div class="np-progress">
                    <span id="np-fullscreen-current-time">0:00</span>
                    <input type="range" id="np-fullscreen-progress-bar" min="0" max="100" value="0">
                    <span id="np-fullscreen-total-time">0:00</span>
                </div>
                <div class="np-controls">
                    <button id="np-fullscreen-prev-btn" title="Trước"><svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg></button>
                    <button id="np-fullscreen-play-pause-btn" class="play-pause-btn" title="Phát"><svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></button>
                    <button id="np-fullscreen-next-btn" title="Tiếp theo"><svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg></button>
                </div>
                <div class="np-extra-controls">
                    <button id="np-fullscreen-volume-btn" title="Âm lượng"><svg viewBox="0 0 24 24" width="24" height="24" class="icon-volume" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
                    <input type="range" id="np-fullscreen-volume-bar" min="0" max="100" value="70">
                    <button id="np-fullscreen-shuffle-btn" title="Ngẫu nhiên"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></svg></button>
                    <button id="np-fullscreen-repeat-btn" title="Lặp lại"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></svg></button>
                </div>
            </div>
        </div>
    `;
    fullscreenPlayerContainer.innerHTML = fullscreenPlayerHTML;

    // --- 2. LẤY CÁC PHẦN TỬ DOM ---
    audioPlayer = document.getElementById('audio-player'); // Assign to global variable
    // Player Bar elements
    const mainPlayPauseBtn = document.getElementById('main-play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeBar = document.getElementById('volume-bar');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const likeBtn = document.getElementById('like-btn');
    const volumeBtn = document.getElementById('volume-btn');
    // Fullscreen elements
    const npCloseBtn = document.getElementById('np-close-btn');
    const npFsProgressBar = document.getElementById('np-fullscreen-progress-bar');
    const npFsPlayPauseBtn = document.getElementById('np-fullscreen-play-pause-btn');
    const npFsPrevBtn = document.getElementById('np-fullscreen-prev-btn');
    const npFsNextBtn = document.getElementById('np-fullscreen-next-btn');
    const npFsVolumeBtn = document.getElementById('np-fullscreen-volume-btn');
    const npFsVolumeBar = document.getElementById('np-fullscreen-volume-bar');
    const npFsShuffleBtn = document.getElementById('np-fullscreen-shuffle-btn');
    const npFsRepeatBtn = document.getElementById('np-fullscreen-repeat-btn');
    const toggleBgBtn = document.getElementById('toggle-bg-btn');

    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    document.body.appendChild(tooltip);

    const addTooltip = (element, text) => {
        element.addEventListener('mouseover', (e) => {
            tooltip.textContent = text;
            tooltip.style.display = 'block';
            const rect = e.target.getBoundingClientRect();
            let left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
            if (left < 0) left = 0;
            if (left + tooltip.offsetWidth > window.innerWidth) left = window.innerWidth - tooltip.offsetWidth;
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        });
        element.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    };

    addTooltip(shuffleBtn, 'Ngẫu nhiên');
    addTooltip(prevBtn, 'Trước');
    addTooltip(mainPlayPauseBtn, 'Phát / Tạm dừng');
    addTooltip(nextBtn, 'Tiếp theo');
    addTooltip(repeatBtn, 'Lặp lại');
    addTooltip(volumeBtn, 'Âm lượng');
    addTooltip(toggleBgBtn, 'Đổi ảnh nền background');
    addTooltip(likeBtn, 'Thích');
    addTooltip(progressBar, 'Thanh tiến trình');
    addTooltip(volumeBar, 'Thanh âm lượng');

    fullscreenPlayerContainer.classList.toggle('show-background', showBg);
    toggleBgBtn.classList.toggle('active', showBg);

    // On pages that load data synchronously, this will populate the song list.
    // On async pages, this will be empty, but registerSongDatabase will fill it.
    if (typeof ALL_MUSIC_SECTIONS !== 'undefined' && Array.isArray(ALL_MUSIC_SECTIONS)) {
        window.registerSongDatabase(ALL_MUSIC_SECTIONS.flatMap(section => section.songs));
    }

    const playIconSVG = '<svg viewBox="0 0 24 24" width="24" height="24" class="icon-play"><path d="M8 5v14l11-7z"></path></svg>';
    const pauseIconSVG = '<svg viewBox="0 0 24 24" width="24" height="24" class="icon-pause"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
    const repeatIconSVG_HTML = '<svg viewBox="0 0 24 24" width="20" height="20" class="icon-repeat"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></svg>';
    const repeatOneIconSVG_HTML = '<svg viewBox="0 0 24 24" width="20" height="20" class="icon-repeat"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zM13 15V9h-1l-2 1v1h1.5v4H13z"></path></svg>';

    const notificationContainer = document.getElementById('notification-container');
    let notificationTimeout;
    function showNotification(message) {
        if (!notificationContainer) return;
        clearTimeout(notificationTimeout);
        notificationContainer.textContent = message;
        notificationContainer.classList.add('active');
        notificationTimeout = setTimeout(() => notificationContainer.classList.remove('active'), 2000);
    }

    // Set Media Session action handlers now that the buttons are available
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => { mainPlayPauseBtn.click(); });
        navigator.mediaSession.setActionHandler('pause', () => { mainPlayPauseBtn.click(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { prevBtn.click(); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { nextBtn.click(); });
    }

    function playNext() {
        if (currentQueue.length === 0) return;
        let nextIndex = isShuffle ? Math.floor(Math.random() * currentQueue.length) : (currentIndex + 1) % currentQueue.length;
        if (isShuffle && currentQueue.length > 1 && nextIndex === currentIndex) return playNext();
        playSongByIndex(nextIndex);
    }

    function playPrev() {
        if (currentQueue.length === 0) return;
        if (audioPlayer.currentTime > 3) { audioPlayer.currentTime = 0; return; }
        const prevIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
        playSongByIndex(isShuffle ? Math.floor(Math.random() * currentQueue.length) : prevIndex);
    }

    // --- 6. GẮN CÁC LISTENER ---
    const songInfoDiv = playerContainer.querySelector('.song-info');
    songInfoDiv.addEventListener('click', (e) => {
        if (e.target.closest('#like-btn')) return;
        if (currentIndex !== -1) fullscreenPlayerContainer.classList.add('active');
    });
    npCloseBtn.addEventListener('click', () => fullscreenPlayerContainer.classList.remove('active'));

    mainPlayPauseBtn.addEventListener('click', () => {
        if (!isVolumeInitialized) { audioPlayer.volume = volumeBar.value / 100; isVolumeInitialized = true; }
        if (currentIndex === -1 && allSongsFlat.length > 0) window.playSongFromData(allSongsFlat[0]);
        else if (audioPlayer.src) audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
    });
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);

    npFsPlayPauseBtn.addEventListener('click', () => mainPlayPauseBtn.click());
    npFsNextBtn.addEventListener('click', () => nextBtn.click());
    npFsPrevBtn.addEventListener('click', () => prevBtn.click());

    const toggleShuffle = () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        npFsShuffleBtn.classList.toggle('active', isShuffle);
        showNotification(isShuffle ? "Đã bật phát ngẫu nhiên" : "Đã tắt phát ngẫu nhiên");
    };
    shuffleBtn.addEventListener('click', toggleShuffle);
    npFsShuffleBtn.addEventListener('click', toggleShuffle);

    const toggleRepeat = () => {
        const modes = ['none', 'all', 'one'];
        const messages = { "all": "Lặp lại tất cả", "one": "Lặp lại một bài", "none": "Đã tắt lặp lại" };
        let currentModeIndex = modes.indexOf(repeatMode);
        repeatMode = modes[(currentModeIndex + 1) % modes.length];
        showNotification(messages[repeatMode]);

        const isActive = repeatMode !== 'none';
        const iconHTML = repeatMode === 'one' ? repeatOneIconSVG_HTML : repeatIconSVG_HTML;

        [repeatBtn, npFsRepeatBtn].forEach(btn => btn.classList.toggle('active', isActive));
        repeatBtn.innerHTML = iconHTML;
        npFsRepeatBtn.innerHTML = iconHTML.replace('width="20" height="20"', 'width="24" height="24"');
    };
    repeatBtn.addEventListener('click', toggleRepeat);
    npFsRepeatBtn.addEventListener('click', toggleRepeat);

    toggleBgBtn.addEventListener('click', () => {
        showBg = !showBg;
        fullscreenPlayerContainer.classList.toggle('show-background', showBg);
        toggleBgBtn.classList.toggle('active', showBg);
        localStorage.setItem('showBg', showBg);
        if (showBg && currentQueue[currentIndex]) {
            const songData = currentQueue[currentIndex];
            const npFsBg = document.getElementById('np-fullscreen-bg');
            if (npFsBg) npFsBg.style.backgroundImage = `url('${songData.artUrl}')`;
        }
    });

    likeBtn.addEventListener('click', () => {
        if (currentIndex === -1) return;
        const song = currentQueue[currentIndex];
        song.isFavorite = !song.isFavorite;
        likeBtn.classList.toggle('active', song.isFavorite);
        showNotification(song.isFavorite ? "Đã thêm vào bài hát yêu thích" : "Đã xóa khỏi bài hát yêu thích");
    });

    const toggleMute = () => audioPlayer.muted = !audioPlayer.muted;
    volumeBtn.addEventListener('click', toggleMute);
    npFsVolumeBtn.addEventListener('click', toggleMute);

    audioPlayer.addEventListener('play', () => {
        mainPlayPauseBtn.innerHTML = pauseIconSVG;
        npFsPlayPauseBtn.innerHTML = pauseIconSVG.replace('width="24" height="24"', 'width="60" height="60"');
    });
    audioPlayer.addEventListener('pause', () => {
        mainPlayPauseBtn.innerHTML = playIconSVG;
        npFsPlayPauseBtn.innerHTML = playIconSVG.replace('width="24" height="24"', 'width="60" height="60"');
    });
    audioPlayer.addEventListener('volumechange', () => {
        const isActive = !audioPlayer.muted && audioPlayer.volume > 0;
        [volumeBtn, npFsVolumeBtn].forEach(btn => btn.classList.toggle('active', isActive));
        if (!audioPlayer.muted) {
            const newVolume = audioPlayer.volume;
            [volumeBar, npFsVolumeBar].forEach(bar => bar.value = newVolume * 100);
            lastVolume = newVolume;
        } else {
            [volumeBar, npFsVolumeBar].forEach(bar => bar.value = 0);
        }
    });
    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime || 0;
        [progressBar, npFsProgressBar].forEach(bar => bar.value = currentTime);
        [currentTimeEl, document.getElementById('np-fullscreen-current-time')].forEach(el => el.textContent = formatTime(currentTime));
    });
    audioPlayer.addEventListener('loadedmetadata', () => {
        const duration = audioPlayer.duration || 0;
        [progressBar, npFsProgressBar].forEach(bar => bar.max = duration);
        [totalTimeEl, document.getElementById('np-fullscreen-total-time')].forEach(el => el.textContent = formatTime(duration));
    });
    audioPlayer.addEventListener('ended', () => {
        if (repeatMode === 'one') playSongByIndex(currentIndex);
        else if (repeatMode === 'none' && !isShuffle && currentIndex === currentQueue.length - 1) {
            document.title = "MyMusic Player";
            updateFavicon("img/favicon.png");
        } else playNext();
    });

    const handleProgressInput = (e) => { if (audioPlayer.src) audioPlayer.currentTime = e.target.value; };
    progressBar.addEventListener('input', handleProgressInput);
    npFsProgressBar.addEventListener('input', handleProgressInput);

    const handleVolumeInput = (e) => {
        audioPlayer.muted = false;
        audioPlayer.volume = e.target.value / 100;
    };
    volumeBar.addEventListener('input', handleVolumeInput);
    npFsVolumeBar.addEventListener('input', handleVolumeInput);

    console.log("Player DOMContentLoaded End");
});

console.log("player.js loaded and functions exposed.");