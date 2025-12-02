// js/artists.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Artists DOMContentLoaded Start");

    const artistsGridContainer = document.getElementById('artists-grid');
    const fallbackImage = 'img/singer-holder.png'; // Ảnh dự phòng

    // --- Hàm tạo card cho một nghệ sĩ ---
    function createArtistCard(artistData) {
        if (!artistData || !artistData.id || !artistData.name) return null;

        const card = document.createElement('a');
        card.href = `artist_page.html?artistId=${encodeURIComponent(artistData.id)}`;
        card.classList.add('card', 'artist-card');

        card.innerHTML = `
            <img src="${artistData.avatarUrl || fallbackImage}" alt="${artistData.name}" class="album-art" loading="lazy">
            <h3 class="artist-card-name">${artistData.name}</h3>
            <p class="artist-card-type">Nghệ sĩ</p>
        `;
        return card;
    }

    // --- Tải dữ liệu từ JSON ---
    fetch('data/music.json')
        .then(response => {
            if (!response.ok) throw new Error('Không thể tải data/music.json');
            return response.json();
        })
        .then(allMusicData => {
            // 1. Đăng ký dữ liệu với Player (quan trọng để player biết danh sách nhạc)
            const allSongs = allMusicData.flatMap(section => section.songs);
            if (window.registerSongDatabase) {
                window.registerSongDatabase(allSongs);
            }

            // 2. Xử lý logic hiển thị Nghệ Sĩ
            if (artistsGridContainer) {
                artistsGridContainer.innerHTML = ''; // Xóa loading...

                const artistsMap = new Map();

                allSongs.forEach(song => {
                    // Kiểm tra xem bài hát có thông tin displayArtist không
                    if (song.displayArtist && song.displayArtist.id) {
                        if (!artistsMap.has(song.displayArtist.id)) {
                            artistsMap.set(song.displayArtist.id, {
                                id: song.displayArtist.id,
                                name: song.displayArtist.name,
                                // Lấy ảnh bìa bài hát làm avatar tạm nếu chưa có
                                avatarUrl: song.artUrl 
                            });
                        }
                    }
                });
                
                const uniqueArtists = Array.from(artistsMap.values());

                if (uniqueArtists.length > 0) {
                    // Sắp xếp theo tên A-Z
                    uniqueArtists.sort((a, b) => a.name.localeCompare(b.name));
                    
                    uniqueArtists.forEach(artist => {
                        const artistCardElement = createArtistCard(artist);
                        if (artistCardElement) {
                            artistsGridContainer.appendChild(artistCardElement);
                        }
                    });
                } else {
                    artistsGridContainer.innerHTML = '<p>Chưa có thông tin nghệ sĩ nào.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Lỗi tải danh sách nghệ sĩ:', error);
            if (artistsGridContainer) {
                artistsGridContainer.innerHTML = '<p>Lỗi tải dữ liệu. Vui lòng thử lại sau.</p>';
            }
        });
    
    console.log("Artists DOMContentLoaded End");
});