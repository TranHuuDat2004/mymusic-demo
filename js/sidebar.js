// js/sidebar.js - Refactored to fetch data

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sidebar DOMContentLoaded Start");

    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) {
        console.error("Không tìm thấy phần tử #sidebar-container để chèn sidebar.");
        return;
    }

    // 1. Define and inject the static part of the sidebar HTML
    const sidebarHTML = `
        <div><img src="img/logo.png" height="80"></div>
        <div class="sidebar-nav">
            <ul>
                <li><a href="index.html"><svg viewBox="0 0 24 24" class="icon-home"><path d="M12 3L4 9v12h5v-7h6v7h5V9z"></path></svg> Trang chủ</a></li>
                <li><a href="search.html"><svg viewBox="0 0 24 24" class="icon-search"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg> Tìm kiếm</a></li>
                <li><a href="library.html"><svg viewBox="0 0 24 24" class="icon-library"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 2v5l-2.5-1.5L13 9V4h5zM8 16h12V4h-2v7l-2.5-1.5L13 9V4H8v12z"></path></svg> Thư viện</a></li>
                <li><a href="soundtrack.html"><svg viewBox="0 0 24 24" class="icon-soundtrack" fill="currentColor" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5v-9l6 4.5-6 4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> Soundtrack</a></li>
                <li><a href="artists.html"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="icon-artist"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> Nghệ Sĩ</a></li>
                <li><a href="studio.html"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="icon-studio"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg> Studio Library</a></li>
                <li><a href="favorite.html"><svg viewBox="0 0 24 24" class="icon-like"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg> Bài hát đã thích</a></li>
                <li><a href="tutorial.html"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="icon-tutorial"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg> Hướng dẫn</a></li>
                <li><a href="about.html"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="icon-info"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg> Giới thiệu</a></li>
                <li><a href="version.html"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="icon-version"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg> Phiên bản</a></li>
            </ul>
        </div>
        <div class="sidebar-playlists">
            <h4>PLAYLISTS</h4>
            <ul id="playlist-links-list">
                <li><a href="#">Đang tải...</a></li>
            </ul>
        </div>
    `;
    sidebarContainer.innerHTML = sidebarHTML;

    // 2. Handle active link highlighting
    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = sidebarContainer.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    };

    // 3. Function to generate playlist links from data
    const generatePlaylistLinks = (musicData) => {
        const playlistList = document.getElementById('playlist-links-list');
        if (!playlistList) return;

        if (musicData && Array.isArray(musicData)) {
            playlistList.innerHTML = ''; // Clear loading/error message
            musicData.forEach(section => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `playlist.html?id=${section.id}`;
                link.textContent = section.title;
                listItem.appendChild(link);
                playlistList.appendChild(listItem);
            });
        } else {
            playlistList.innerHTML = '<li><a href="#" style="color: red;">Lỗi dữ liệu</a></li>';
            console.warn("Invalid data provided to generatePlaylistLinks.");
        }
    };

    // 4. Fetch data and then generate the playlist links
    fetch('data/music.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(musicData => {
            generatePlaylistLinks(musicData);
        })
        .catch(error => {
            console.error('Sidebar: Error fetching playlist data:', error);
            const playlistList = document.getElementById('playlist-links-list');
            if (playlistList) {
                playlistList.innerHTML = '<li><a href="#" style="color: red;">Lỗi tải playlist</a></li>';
            }
        });

    // 5. Execute synchronous setup functions
    setActiveLink();

    // 6. Sidebar toggle logic
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            sidebarContainer.classList.toggle('active');
            toggleSidebarOverlay(sidebarContainer.classList.contains('active'));
        });
    }

    document.addEventListener('click', (event) => {
        if (sidebarContainer && sidebarContainer.classList.contains('active') &&
            !sidebarContainer.contains(event.target) &&
            event.target !== menuToggleBtn) {
            sidebarContainer.classList.remove('active');
            toggleSidebarOverlay(false);
        }
    });

    function toggleSidebarOverlay(show) {
        let overlay = document.querySelector('.sidebar-overlay');
        if (show) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.classList.add('sidebar-overlay');
                overlay.style.cssText = `position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 999;`;
                document.body.appendChild(overlay);
                overlay.addEventListener('click', () => {
                    if (sidebarContainer) sidebarContainer.classList.remove('active');
                    toggleSidebarOverlay(false);
                });
            }
            overlay.style.display = 'block';
        } else {
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    }

    console.log("Sidebar DOMContentLoaded End");
});

console.log("sidebar.js loaded");
