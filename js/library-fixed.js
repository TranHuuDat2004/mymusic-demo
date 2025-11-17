// js/library-fixed.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Fixed Library DOMContentLoaded Start");

    const libraryContainer = document.getElementById('library-content-container');
    const songsDisplayContainer = document.getElementById('library-songs-display');
    const loadingMessage = document.querySelector('.loading-message');

    let allLibrarySongs = [];
    let currentViewMode = 'grid'; // 'grid' or 'list'

    // --- Hàm tạo một mục bài hát trong danh sách (kiểu bảng) ---
    // Lấy lại từ file library.js gốc để đảm bảo tính tương thích
    function createSongListItem(songData, index) {
        const songItem = document.createElement('div');
        songItem.classList.add('song-list-item');
        
        // Lưu dữ liệu vào dataset để player có thể sử dụng
        songItem.dataset.src = songData.audioSrc || '';
        songItem.dataset.title = songData.title || 'Không có tiêu đề';
        songItem.dataset.artist = songData.displayArtist?.name || songData.artistData || 'N/A';
        songItem.dataset.art = songData.artUrl || 'img/favicon.png';

        const artistName = songData.displayArtist?.name || songData.artistData || 'N/A';

        songItem.innerHTML = `
            <span class="song-index">${index}</span>
            <img src="${songData.artUrl || 'img/favicon.png'}" alt="${songData.title}" class="album-art-small">
            <div class="song-details">
                <div class="song-title">${songData.title || 'Không có tiêu đề'}</div>
            </div>
            <div class="song-artist-column">${artistName}</div>
            <div class="song-plays">${songData.plays || 'N/A'}</div>
            <div class="song-duration">--:--</div>
            <div class="song-actions">
                <button title="Thích" class="like-song-btn ${songData.isFavorite ? 'liked' : ''}" data-song-id="${songData.id}">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
            </div>
        `;

        // Gắn listener click để phát nhạc cho cả dòng
        songItem.addEventListener('click', (event) => {
            if (event.target.closest('.like-song-btn')) {
                // Xử lý logic like ở đây nếu cần, hoặc để event delegation xử lý
                return;
            }
            // window.playSongFromData mong muốn nhận songData đầy đủ
            // Thay vì dựa vào dataset, ta truyền trực tiếp object songData
            if (typeof window.playSongFromData === 'function') {
                window.playSongFromData(songData);
            } else {
                console.error('playSongFromData function not found!');
            }
        });

        return songItem;
    }

    // --- Hàm render nội dung dựa trên chế độ xem ---
    // Sử dụng lại logic gốc để đảm bảo tương thích
    function renderLibraryContent(viewMode) {
        if (!songsDisplayContainer) return;
        songsDisplayContainer.innerHTML = ''; // Xóa nội dung cũ

        if (allLibrarySongs.length === 0) {
            songsDisplayContainer.innerHTML = '<p class="loading-message">Thư viện trống.</p>';
            return;
        }

        if (viewMode === 'grid') {
            songsDisplayContainer.className = 'card-grid';
            allLibrarySongs.forEach(song => {
                // QUAN TRỌNG: Gọi lại hàm createSongCard gốc từ utils.js
                if (typeof createSongCard === 'function') {
                    const card = createSongCard(song);
                    songsDisplayContainer.appendChild(card);
                } else {
                    console.error('createSongCard function not found!');
                }
            });
        } else if (viewMode === 'list') {
            songsDisplayContainer.className = 'song-list-container';
            // Header cho list view
            const tableHeader = document.createElement('div');
            tableHeader.classList.add('song-list-header', 'song-list-item');
            tableHeader.innerHTML = `
                <span class="song-index">#</span>
                <span class="song-art-placeholder" style="width: 40px; margin-right: 15px;"></span>
                <div class="song-details"><div class="song-title">TIÊU ĐỀ</div></div>
                <div class="song-artist-column">NGHỆ SĨ</div>
                <div class="song-plays">LƯỢT NGHE</div>
                <div class="song-duration">THỜI LƯỢNG</div>
                <div class="song-actions"></div>
            `;
            songsDisplayContainer.appendChild(tableHeader);

            allLibrarySongs.forEach((song, index) => {
                const songItem = createSongListItem(song, index + 1);
                songsDisplayContainer.appendChild(songItem);
            });
        }
    }

    // --- Hàm thiết lập các nút chuyển đổi chế độ xem ---
    function setupViewToggles() {
        const header = document.querySelector('.library-header');
        if (!header.querySelector('.view-toggle-buttons')) {
            const viewToggleButtonsDiv = document.createElement('div');
            viewToggleButtonsDiv.className = 'view-toggle-buttons';
            viewToggleButtonsDiv.innerHTML = `
                <button id="view-toggle-grid" class="view-toggle-btn" title="Xem dạng lưới">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg>
                </button>
                <button id="view-toggle-list" class="view-toggle-btn" title="Xem dạng danh sách">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 13h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V7H3v2z"/></svg>
                </button>
            `;
            header.appendChild(viewToggleButtonsDiv);
        }

        const gridBtn = document.getElementById('view-toggle-grid');
        const listBtn = document.getElementById('view-toggle-list');

        function updateView(view) {
            if (currentViewMode === view && songsDisplayContainer.children.length > 1) return; // Không render lại nếu đã ở view đó
            currentViewMode = view;
            renderLibraryContent(view);
            gridBtn.classList.toggle('active', view === 'grid');
            listBtn.classList.toggle('active', view === 'list');
        }

        gridBtn.addEventListener('click', () => updateView('grid'));
        listBtn.addEventListener('click', () => updateView('list'));
        
        // Set initial view
        updateView(currentViewMode);
    }

    // --- Hàm khởi tạo chính ---
    async function initialize() {
        if (!libraryContainer || !songsDisplayContainer) return;

        try {
            const response = await fetch('data/music.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const musicData = await response.json();

            let tempSongs = [];
            const seen = new Set();
            musicData.forEach(section => {
                if (Array.isArray(section.songs)) {
                    section.songs.forEach(song => {
                        const uniqueId = song.id || `${song.title}-${song.artistData}`;
                        if (!seen.has(uniqueId)) {
                            tempSongs.push(song);
                            seen.add(uniqueId);
                        }
                    });
                }
            });
            allLibrarySongs = tempSongs;

            // CRITICAL FIX: Register the fetched songs with the player
            if (typeof window.registerSongDatabase === 'function') {
                window.registerSongDatabase(allLibrarySongs);
            }

            setupViewToggles();
            renderLibraryContent(currentViewMode); // Render lần đầu

            if(loadingMessage) loadingMessage.remove();

        } catch (error) {
            console.error("Lỗi khi khởi tạo thư viện:", error);
            songsDisplayContainer.innerHTML = '<p class="loading-message">Lỗi tải dữ liệu thư viện.</p>';
        }
    }

    initialize();

    if (typeof window.appendMainFooter === 'function') {
        window.appendMainFooter();
    }

    console.log("Fixed Library DOMContentLoaded End");
});
