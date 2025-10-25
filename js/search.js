// js/search.js - Refactored to fetch data

document.addEventListener('DOMContentLoaded', () => {
    console.log("Search DOMContentLoaded Start");

    // Fetch the music data first
    fetch('data/music.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(musicData => {
            // Once data is loaded, initialize all search functionality
            initializeAppWithData(musicData);
        })
        .catch(error => {
            console.error('Search page: Lỗi khi tải dữ liệu nhạc:', error);
            const resultsContainer = document.getElementById('search-results-container');
            if (resultsContainer) {
                resultsContainer.innerHTML = '<p style="color: red;">Không thể tải dữ liệu để tìm kiếm. Vui lòng thử lại.</p>';
            }
        });
});

function initializeAppWithData(ALL_MUSIC_SECTIONS) {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results-container');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    // Ensure utility functions are available from utils.js
    if (typeof window.createSongCard !== 'function') {
       console.error("Lỗi: hàm createSongCard không tồn tại. Cần nạp utils.js trước.");
       resultsContainer.innerHTML = '<p style="color: red;">Lỗi giao diện. Vui lòng tải lại trang.</p>';
       return;
    }

    function performSearch(query) {
        if (!resultsContainer) return;
        resultsContainer.innerHTML = ''; // Clear old results

        const initialMessage = '<p class="search-initial-message">Nhập từ khóa để bắt đầu tìm kiếm.</p>';
        if (!query) {
             resultsContainer.innerHTML = initialMessage;
            return;
        }

        const lowerCaseQuery = query.toLowerCase().trim();
        const foundSongs = [];

        // Use the passed-in music data
        ALL_MUSIC_SECTIONS.forEach(section => {
            if (Array.isArray(section.songs)) {
                section.songs.forEach(song => {
                    const titleMatch = song.title?.toLowerCase().includes(lowerCaseQuery);
                    const artistMatch = song.displayArtist?.name?.toLowerCase().includes(lowerCaseQuery);
                    const artistDataMatch = song.artistData?.toLowerCase().includes(lowerCaseQuery);

                    if (titleMatch || artistMatch || artistDataMatch) {
                        // Prevent duplicates
                        const uniqueId = song.id || `${song.title}-${song.artistData}`;
                        if (!foundSongs.some(found => (found.id || `${found.title}-${found.artistData}`) === uniqueId)) {
                            foundSongs.push(song);
                        }
                    }
                });
            }
        });

        if (foundSongs.length > 0) {
            const resultGrid = document.createElement('div');
            resultGrid.classList.add('card-grid');
            foundSongs.forEach(song => {
                const card = window.createSongCard(song);
                // Add click listener to play the song, assuming player.js is loaded and provides this function
                if (typeof addCardClickListener === 'function') {
                    addCardClickListener(card);
                } else if (typeof window.playSongFromData === 'function') {
                     card.addEventListener('click', () => {
                        window.playSongFromData(song, foundSongs);
                    });
                }
                resultGrid.appendChild(card);
            });
            resultsContainer.appendChild(resultGrid);
        } else {
            resultsContainer.innerHTML = `<p>Không tìm thấy kết quả nào cho "${query}".</p>`;
        }
    }

    // Setup event listeners
    if (searchInput && clearSearchBtn) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value;
            performSearch(query);
            clearSearchBtn.style.display = query ? 'inline-block' : 'none';
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            performSearch('');
            clearSearchBtn.style.display = 'none';
            searchInput.focus();
        });
    } else {
        console.warn("Không tìm thấy search input hoặc nút clear.");
    }

    console.log("Search functionality initialized.");
}

console.log("search.js loaded");
