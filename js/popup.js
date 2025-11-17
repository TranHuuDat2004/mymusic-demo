// js/popup.js

document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('disclaimer-popup');
    const closeButton = document.getElementById('popup-close');
    const confirmButton = document.getElementById('popup-confirm');
    const POPUP_SHOWN_KEY = 'disclaimerPopupShown';

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
