// js/data-loader.js

console.log("Data Loader: Bắt đầu tải trước dữ liệu nhạc...");

/**
 * File này hoạt động như một "pre-loader".
 * Nó sẽ tải file music.json ngay lập tức và tạo ra biến toàn cục `window.ALL_MUSIC_SECTIONS`.
 * Player.js có một cơ chế dự phòng để tìm biến này nếu kho dữ liệu nội bộ của nó trống.
 * Bằng cách tạo biến này sớm, chúng ta đảm bảo player luôn có dữ liệu để sử dụng,
 * giải quyết vấn đề "race condition" trên các trang sử dụng fetch().
 */
(async () => {
    try {
        const response = await fetch('data/music.json');
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! status: ${response.status}`);
        }
        const musicData = await response.json();

        // Bước quan trọng: Gán dữ liệu vào một biến toàn cục
        window.ALL_MUSIC_SECTIONS = musicData;

        console.log(`Data Loader: Tải thành công và đã tạo biến toàn cục ALL_MUSIC_SECTIONS.`);

    } catch (error) {
        console.error('Data Loader: Không thể tải trước dữ liệu nhạc.', error);
        // Tạo một mảng rỗng để các script khác không bị lỗi
        window.ALL_MUSIC_SECTIONS = [];
    }
})();