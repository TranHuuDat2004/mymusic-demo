// js/popup.js

document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('disclaimer-popup');
    const closeButton = document.getElementById('popup-close');
    const confirmButton = document.getElementById('popup-confirm');
    const POPUP_SHOWN_KEY = 'disclaimerPopupShown';

    // --- BẮT ĐẦU: Logic đa ngôn ngữ ---
    const viContent = document.getElementById('popup-content-vi');
    const enContent = document.getElementById('popup-content-en');

    // Lấy mã ngôn ngữ của trình duyệt (ví dụ: 'vi', 'en-US', 'en')
    const userLang = navigator.language || navigator.userLanguage;

    // Kiểm tra xem có phải là tiếng Anh không
    if (userLang.startsWith('en')) {
        // Nếu là tiếng Anh, ẩn nội dung tiếng Việt và hiện nội dung tiếng Anh
        if (viContent) viContent.style.display = 'none';
        if (enContent) enContent.style.display = 'block';
        // Đổi cả text của nút
        if (confirmButton) confirmButton.textContent = 'I Understand';
    }
    // Nếu không phải tiếng Anh, mặc định sẽ hiển thị tiếng Việt (vì HTML đã cài sẵn)
    // --- KẾT THÚC: Logic đa ngôn ngữ ---


    // Check if the user has seen the popup before
    const hasSeenPopup = localStorage.getItem(POPUP_SHOWN_KEY);

    if (!hasSeenPopup) {
        // If not, show the popup
        if (popupOverlay) {
            popupOverlay.classList.add('active');
        }
    }

    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
        }
        // Mark that the user has seen the popup
        localStorage.setItem(POPUP_SHOWN_KEY, 'true');
    }

    // Add event listeners to the close and confirm buttons
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
    if (confirmButton) {
        confirmButton.addEventListener('click', closePopup);
    }

    // Optional: Allow closing by clicking the overlay
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (event) => {
            if (event.target === popupOverlay) {
                closePopup();
            }
        });
    }
});