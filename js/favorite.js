// js/favorite.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Favorite DOMContentLoaded Start");

    const favoriteContainer = document.getElementById('favorite-songs-grid');
    const playlistUl = document.getElementById('playlist-links-list');

    // --- Tải dữ liệu từ JSON ---
    fetch('data/music.json')
        .then(response => {
            if (!response.ok) throw new Error('Không thể tải data/music.json');
            return response.json();
        })
        .then(allMusicData => {
            // 1. Gộp tất cả bài hát thành 1 mảng phẳng
            const allSongs = allMusicData.flatMap(section => section.songs);

            // 2. Đăng ký dữ liệu với Player (QUAN TRỌNG: để click vào bài hát nó chạy được)
            if (window.registerSongDatabase) {
                window.registerSongDatabase(allSongs);
            }

            // 3. Xử lý hiển thị danh sách Yêu thích
            if (favoriteContainer) {
                favoriteContainer.innerHTML = ''; // Xóa thông báo "Đang tải..."
                
                const favoriteSongs = [];

                // Lọc bài hát yêu thích, tránh trùng lặp
                allSongs.forEach(song => {
                    if (song.isFavorite === true) {
                        const uniqueId = song.id || `${song.title}-${song.artistData}`;
                        if (!favoriteSongs.some(fav => (fav.id || `${fav.title}-${fav.artistData}`) === uniqueId)) {
                            favoriteSongs.push(song);
                        }
                    }
                });

                // Hiển thị ra màn hình
                if (favoriteSongs.length > 0) {
                    favoriteSongs.forEach(song => {
                        // Gọi hàm createSongCard từ utils.js
                        if (typeof window.createSongCard === 'function') {
                            const card = window.createSongCard(song); 
                            favoriteContainer.appendChild(card);
                        }
                    });
                } else {
                    favoriteContainer.innerHTML = '<p>Bạn chưa có bài hát yêu thích nào.</p>';
                }
            }

            // 4. Render Sidebar Playlist Links (Tái sử dụng dữ liệu đã fetch)
            if (playlistUl && typeof window.renderPlaylistLinks === 'function') {
                window.renderPlaylistLinks(allMusicData, playlistUl);
            }

        })
        .catch(error => {
            console.error("Lỗi tại trang favorite:", error);
            if(favoriteContainer) favoriteContainer.innerHTML = '<p>Lỗi tải danh sách yêu thích.</p>';
        });

    // Đánh dấu active cho link sidebar
    document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
    const favoriteLink = document.querySelector('.sidebar-nav a[href="favorite.html"]');
    if(favoriteLink) favoriteLink.classList.add('active');

    console.log("Favorite DOMContentLoaded End");
});