document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('main-music-content');

    if (!mainContainer) {
        console.error('Không tìm thấy container chính #main-music-content');
        return;
    }

    // Hàm để render các section nhạc (tương tự như trong all_song.js)
    function renderMusicSections(sectionsData, containerElement) {
        if (!containerElement || !sectionsData) return;

        // Xóa nội dung cũ, giữ lại H1 nếu muốn
        const existingH1 = containerElement.querySelector('h1');
        containerElement.innerHTML = ''; // Xóa sạch
        if (existingH1) {
            containerElement.appendChild(existingH1); // Thêm lại H1
        } else {
            const welcomeTitle = document.createElement('h1');
            welcomeTitle.textContent = 'Tất cả Playlist';
            containerElement.appendChild(welcomeTitle);
        }

        sectionsData.forEach(section => {
            const sectionElement = document.createElement('section');
            sectionElement.id = section.id;
            sectionElement.classList.add('content-section');

            const titleElement = document.createElement('h2');
            titleElement.textContent = section.title;

            const cardGridElement = document.createElement('div');
            cardGridElement.classList.add('card-grid');

            if (section.songs && section.songs.length > 0) {
                section.songs.forEach(song => {
                    // Giả sử hàm createSongCard đã có sẵn trong global scope (từ utils.js)
                    if (typeof window.createSongCard === 'function') {
                        const card = window.createSongCard(song);
                        cardGridElement.appendChild(card);
                    } else {
                        console.error("Hàm createSongCard không tồn tại.");
                    }
                });
            } else {
                const noSongsMessage = document.createElement('p');
                noSongsMessage.textContent = 'Chưa có bài hát nào trong mục này.';
                cardGridElement.appendChild(noSongsMessage);
            }

            sectionElement.appendChild(titleElement);
            sectionElement.appendChild(cardGridElement);
            containerElement.appendChild(sectionElement);
        });
    }

    // Sử dụng fetch để tải dữ liệu từ music.json
    fetch('data/music.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(musicData => {
            // Sau khi tải dữ liệu thành công, gọi hàm render
            renderMusicSections(musicData, mainContainer);
        })
        .catch(error => {
            console.error('Lỗi khi tải hoặc xử lý file music.json:', error);
            mainContainer.innerHTML = '<h1>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.</h1>';
        });
        
    // GỌI HÀM CHÈN FOOTER SAU KHI MỌI THỨ ĐÃ XONG
    if (typeof window.appendMainFooter === 'function') {
        window.appendMainFooter();
    }
});
