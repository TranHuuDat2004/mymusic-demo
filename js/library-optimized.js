// js/library-optimized.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Optimized Library DOMContentLoaded Start");

    const libraryContainer = document.getElementById('library-content-container');
    const songsDisplayContainer = document.getElementById('library-songs-display');
    const loadingMessage = document.querySelector('.loading-message');

    let allLibrarySongs = [];
    let currentViewMode = 'grid'; // 'grid' or 'list'

    // --- Hàm tạo một mục bài hát DUY NHẤT, có thể tạo kiểu cho cả hai chế độ xem ---
    function createUnifiedSongItem(songData, index) {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';

        // Lưu trữ tất cả dữ liệu cần thiết để phát nhạc
        songItem.dataset.song = JSON.stringify(songData);

        const artistName = songData.displayArtist?.name || songData.artistData || 'N/A';

        songItem.innerHTML = `
            <span class="song-index">${index}</span>
            <img src="${songData.artUrl || 'img/favicon.png'}" alt="${songData.title}" class="album-art-small">
            <div class="song-details">
                <div class="song-title">${songData.title || 'Không có tiêu đề'}</div>
                <div class="song-artist">${artistName}</div>
            </div>
            <div class="song-artist-column">${artistName}</div>
            <div class="song-plays">${songData.plays || 'N/A'}</div>
            <div class="song-duration">--:--</div>
            <div class="song-actions">
                <button title="Thích" class="like-song-btn ${songData.isFavorite ? 'liked' : ''}" data-song-id="${songData.id}">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
        `;
        return songItem;
    }

    // --- Hàm render toàn bộ thư viện ---
    function renderLibrary() {
        if (!songsDisplayContainer) return;

        songsDisplayContainer.innerHTML = ''; // Xóa sạch trước khi render

        if (allLibrarySongs.length === 0) {
            songsDisplayContainer.innerHTML = '<p class="loading-message">Thư viện trống.</p>';
            return;
        }

        // Thêm header cho chế độ xem danh sách (chỉ hiển thị bởi CSS)
        const listHeader = document.createElement('div');
        listHeader.className = 'song-list-header';
        listHeader.innerHTML = `
            <span class="song-index">#</span>
            <div class="song-details" style="margin-left: 55px;">TIÊU ĐỀ</div>
            <div class="song-artist-column">NGHỆ SĨ</div>
            <div class="song-plays">LƯỢT NGHE</div>
            <div class="song-duration">THỜI LƯỢNG</div>
            <div class="song-actions"></div>
        `;
        songsDisplayContainer.appendChild(listHeader);


        allLibrarySongs.forEach((song, index) => {
            const songItem = createUnifiedSongItem(song, index + 1);
            songsDisplayContainer.appendChild(songItem);
        });
    }

    // --- Hàm thiết lập các nút chuyển đổi chế độ xem ---
    function setupViewToggles() {
        const header = document.querySelector('.library-header');
        if (!header) return;

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

        const gridBtn = document.getElementById('view-toggle-grid');
        const listBtn = document.getElementById('view-toggle-list');

        function updateView(view) {
            currentViewMode = view;
            songsDisplayContainer.className = view === 'grid' ? 'grid-view' : 'list-view';
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
        if (!libraryContainer || !songsDisplayContainer) {
            console.error("Không tìm thấy các container cần thiết.");
            return;
        }

        try {
            // 1. Tải dữ liệu bất đồng bộ
            const response = await fetch('data/music.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const musicData = await response.json();

            // 2. Gom tất cả bài hát vào một mảng duy nhất
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

            // 3. Thiết lập các nút điều khiển và render thư viện
            setupViewToggles();
            renderLibrary();

            // 4. Xóa thông báo loading
            if(loadingMessage) loadingMessage.remove();

        } catch (error) {
            console.error("Lỗi nghiêm trọng khi khởi tạo thư viện:", error);
            songsDisplayContainer.innerHTML = '<p class="loading-message">Đã xảy ra lỗi khi tải dữ liệu thư viện.</p>';
        }
    }

    // --- Xử lý sự kiện click tập trung ---
    songsDisplayContainer.addEventListener('click', (event) => {
        const songItem = event.target.closest('.song-item');
        if (!songItem) return; // Không phải click vào một bài hát

        const songDataString = songItem.dataset.song;
        if (!songDataString) return;

        const songData = JSON.parse(songDataString);

        // Xử lý nút "like"
        if (event.target.closest('.like-song-btn')) {
            const likeBtn = event.target.closest('.like-song-btn');
            likeBtn.classList.toggle('liked');
            // Cập nhật trạng thái isFavorite trong mảng (tùy chọn, để giữ state)
            const songInArray = allLibrarySongs.find(s => s.id === songData.id);
            if (songInArray) {
                songInArray.isFavorite = likeBtn.classList.contains('liked');
            }
            console.log(`Song ${songData.title} favorite status: ${songInArray.isFavorite}`);
            return; // Dừng lại để không phát nhạc
        }

        // Phát nhạc nếu click vào bất kỳ đâu khác trên item
        if (typeof window.playSongFromData === 'function') {
            window.playSongFromData(songData);
        }
    });

    // Bắt đầu quá trình khởi tạo
    initialize();

    // GỌI HÀM CHÈN FOOTER
    if (typeof window.appendMainFooter === 'function') {
        window.appendMainFooter();
    }

    console.log("Optimized Library DOMContentLoaded End");
});
