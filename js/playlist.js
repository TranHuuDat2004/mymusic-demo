// js/playlist.js - Refactored to fetch data

// --- UTILITY FUNCTIONS (Should be in a separate utils.js file) ---
// These functions are kept here for now to avoid breaking other pages
// that might be incorrectly depending on this file.
console.log("playlist.js loading...");

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function getAudioFileDuration(audioSrc) {
    return new Promise((resolve) => {
        if (!audioSrc) {
            resolve("0:00");
            return;
        }
        const audio = new Audio();
        audio.preload = "metadata";
        audio.onloadedmetadata = () => {
            if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
                resolve(formatTime(audio.duration));
            } else {
                resolve("N/A");
            }
            audio.src = "";
            audio.load();
        };
        audio.onerror = () => resolve("N/A");
        try {
            audio.src = audioSrc;
        } catch (error) {
            console.error(`Error setting audio src for ${audioSrc}:`, error);
            resolve("N/A");
        }
    });
}

function createSongCard(songData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.src = songData.audioSrc || '';
    card.dataset.title = songData.title || 'Không có tiêu đề';
    card.dataset.artist = songData.artistData || songData.displayArtist?.name || 'N/A';
    card.dataset.art = songData.artUrl || 'https://via.placeholder.com/200';

    const img = document.createElement('img');
    img.src = songData.artUrl || 'https://via.placeholder.com/200';
    img.alt = songData.title || 'Album Art';
    img.classList.add('album-art');
    img.loading = 'lazy';

    const titleH3 = document.createElement('h3');
    titleH3.classList.add('song-title');
    titleH3.textContent = songData.title || 'Không có tiêu đề';

    const artistP = document.createElement('p');
    artistP.classList.add('song-artist');
    if (songData.displayArtist && songData.displayArtist.id && songData.displayArtist.name) {
        const artistLink = document.createElement('a');
        artistLink.href = `artist_page.html?artistId=${encodeURIComponent(songData.displayArtist.id)}`;
        artistLink.textContent = songData.displayArtist.name;
        artistLink.addEventListener('click', (e) => e.stopPropagation());
        artistP.appendChild(artistLink);
    } else {
        artistP.textContent = (songData.displayArtist && songData.displayArtist.name) || 'Nghệ sĩ không xác định';
    }

    const playButton = document.createElement('button');
    playButton.classList.add('play-button-overlay');
    playButton.innerHTML = '▶';

    card.appendChild(img);
    card.appendChild(titleH3);
    card.appendChild(artistP);
    card.appendChild(playButton);
    return card;
}

function createSongListItem(songData, index, artistNameToDisplay) {
    const songItem = document.createElement('div');
    songItem.classList.add('song-list-item');
    songItem.dataset.src = songData.audioSrc || '';
    songItem.dataset.title = songData.title || 'Không có tiêu đề';
    songItem.dataset.artist = artistNameToDisplay || songData.artistData || 'N/A';
    songItem.dataset.art = songData.albumArt || songData.artUrl || 'https://via.placeholder.com/40';

    const durationDisplay = songData.duration || 'N/A';

    songItem.innerHTML = `
        <span class="song-index">${index}</span>
        <img src="${songData.albumArt || songData.artUrl || 'https://via.placeholder.com/40'}" alt="${songData.title || 'Art'}" class="album-art-small">
        <div class="song-details">
            <div class="song-title">${songData.title || 'Không có tiêu đề'}</div>
        </div>
        <div class="song-artist-column">${artistNameToDisplay || 'Nghệ sĩ không xác định'}</div>
        <div class="song-plays">${songData.plays || 'N/A'}</div>
        <div class="song-duration">${durationDisplay}</div>
        <div class="song-actions">
            <button title="Thích" class="like-song-btn" data-song-id="${songData.id || ''}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
        </div>
    `;

    const likeBtn = songItem.querySelector('.like-song-btn');
    if (likeBtn) {
        if (songData.isFavorite) {
            likeBtn.classList.add('liked');
            likeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#1DB954"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        }
        likeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('liked');
            songData.isFavorite = this.classList.contains('liked');
            this.innerHTML = songData.isFavorite ?
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="#1DB954"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' :
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        });
    }
    return songItem;
}

function renderPlaylistLinks(sectionsData, targetUlElement) {
    if (!targetUlElement) return;
    if (!sectionsData || !Array.isArray(sectionsData)) {
        targetUlElement.innerHTML = '<li>Lỗi tải playlist</li>'; return;
    }
    targetUlElement.innerHTML = '';
    const currentPage = window.location.pathname.split("/").pop();
    const urlParams = new URLSearchParams(window.location.search);
    const currentPlaylistId = urlParams.get('id');

    sectionsData.forEach(section => {
        if (section && section.id && section.title) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `playlist.html?id=${encodeURIComponent(section.id)}`;
            link.textContent = section.title;
            if (currentPage === 'playlist.html' && currentPlaylistId === section.id) {
                link.classList.add('active-playlist-link');
            }
            listItem.appendChild(link);
            targetUlElement.appendChild(listItem);
        }
    });
}

window.formatTime = formatTime;
window.getAudioFileDuration = getAudioFileDuration;
window.createSongCard = createSongCard;
window.createSongListItem = createSongListItem;
window.renderPlaylistLinks = renderPlaylistLinks;

// --- PAGE INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    console.log("Playlist DOMContentLoaded Start");

    fetch('data/music.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(musicData => {
            initializePlaylistPage(musicData);
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu playlist:', error);
            const container = document.getElementById('playlist-detail-container');
            if (container) {
                container.innerHTML = '<h1>Lỗi</h1><p>Không thể tải thông tin playlist. Vui lòng kiểm tra lại.</p>';
            }
        });
});

async function initializePlaylistPage(ALL_MUSIC_SECTIONS) {
    const playlistDetailContainer = document.getElementById('playlist-detail-container');
    const playlistUlSidebar = document.getElementById('playlist-links-list');

    const getPlaylistIdFromUrl = () => new URLSearchParams(window.location.search).get('id');
    const playlistId = getPlaylistIdFromUrl();

    if (!playlistDetailContainer || !playlistId) {
        console.error("Playlist.js: Container hoặc ID playlist không hợp lệ.");
        if (playlistDetailContainer) playlistDetailContainer.innerHTML = '<h1>Lỗi</h1><p>Không thể tải thông tin playlist.</p>';
        return;
    }

    if (playlistUlSidebar && typeof window.renderPlaylistLinks === 'function') {
        window.renderPlaylistLinks(ALL_MUSIC_SECTIONS, playlistUlSidebar);
    }

    const targetSection = ALL_MUSIC_SECTIONS.find(section => section.id === playlistId);

    if (targetSection) {
        playlistDetailContainer.innerHTML = ''; // Clear "Loading..."
        document.title = `${targetSection.title} - My Music Player`;

        // Create Playlist Header
        const playlistHeaderDiv = document.createElement('div');
        playlistHeaderDiv.classList.add('playlist-header-details');
        const coverArtSrc = targetSection.songs && targetSection.songs.length > 0 ? (targetSection.songs[0].artUrl || 'https://via.placeholder.com/180?text=Playlist') : 'https://via.placeholder.com/180?text=Playlist';
        playlistHeaderDiv.innerHTML = `
            <div class="playlist-cover-art">
                <img src="${coverArtSrc}" alt="${targetSection.title}">
            </div>
            <div class="playlist-info">
                <span class="playlist-type">Playlist</span>
                <h1 class="playlist-main-title">${targetSection.title}</h1>
                <p class="playlist-description">${targetSection.description || ''}</p>
                <div class="playlist-stats">
                    ${targetSection.songs ? targetSection.songs.length : 0} bài hát
                </div>
            </div>
        `;
        playlistDetailContainer.appendChild(playlistHeaderDiv);

        // Create Song List Container
        const songListContainer = document.createElement('div');
        songListContainer.id = `playlist-${playlistId}-songs`;
        songListContainer.classList.add('song-list-container');

        const tableHeader = document.createElement('div');
        tableHeader.classList.add('song-list-header', 'song-list-item');
        tableHeader.innerHTML = `
            <span class="song-index">#</span>
            <span class="song-art-placeholder"></span>
            <div class="song-details"><div class="song-title">TIÊU ĐỀ</div></div>
            <div style="padding-left:40px" class="song-artist-column">NGHỆ SĨ</div>
            <div class="song-plays">LƯỢT NGHE</div>
            <div class="song-duration">THỜI LƯỢNG</div>
            <div class="song-actions-placeholder"></div>
        `;
        songListContainer.appendChild(tableHeader);

        if (targetSection.songs && targetSection.songs.length > 0) {
            let songsToDisplay = JSON.parse(JSON.stringify(targetSection.songs));

            if (typeof window.getAudioFileDuration === 'function') {
                const durationPromises = songsToDisplay.map(song => 
                    window.getAudioFileDuration(song.audioSrc).then(duration => {
                        song.duration = duration;
                    })
                );
                await Promise.all(durationPromises);
            }

            songsToDisplay.forEach((songData, index) => {
                if (typeof window.createSongListItem === 'function') {
                    const songItem = window.createSongListItem(songData, index + 1, songData.displayArtist?.name || songData.artistData);
                    songItem.addEventListener('click', function (event) {
                        if (event.target.closest('button.like-song-btn') || event.target.closest('a')) return;
                        if (typeof window.playSongFromData === 'function' && songData.audioSrc) {
                            window.playSongFromData(songData, songsToDisplay);
                        }
                    });
                    songListContainer.appendChild(songItem);
                }
            });
        } else {
            songListContainer.innerHTML = '<p>Playlist này chưa có bài hát nào.</p>';
        }
        playlistDetailContainer.appendChild(songListContainer);

    } else {
        playlistDetailContainer.innerHTML = '<h1>Không tìm thấy playlist</h1><p>Playlist bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>';
        document.title = "Không tìm thấy playlist - My Music Player";
    }

    document.querySelectorAll('.sidebar-nav > ul > li > a').forEach(link => {
        if (!link.closest('.sidebar-playlists')) {
            link.classList.remove('active');
        }
    });

    if (typeof window.appendMainFooter === 'function') {
        window.appendMainFooter();
    }

    console.log("Playlist DOMContentLoaded End");
}

console.log("playlist.js loaded successfully.");
