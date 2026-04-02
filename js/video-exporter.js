/**
 * video-exporter.js
 * Phiên bản Remix TỐI ƯU HIỆU NĂNG + FIX LỖI CHUYỂN TAB & MÁY YẾU
 */

const { createFFmpeg, fetchFile } = typeof FFmpeg !== 'undefined' ? FFmpeg : { createFFmpeg: null, fetchFile: null };
let ffmpeg = null;

let useWebMFallback = true;
let isExportCancelled = false;

// ĐÃ FIX: Sửa style của thẻ canvas ở dòng cuối cùng
const videoExportModalHTML = `
<div id="video-export-modal" class="modal-overlay" style="display:none;">
    <div class="modal-content video-export-content">
        <button id="close-export-modal" class="close-btn">&times;</button>
        <h2>Xuất Video Chia Sẻ</h2>
        <div id="fallback-notice" style="background: #e3f2fd; color: #0277bd; padding: 12px; border-radius: 8px; font-size: 0.85em; margin-bottom: 15px; border-left: 4px solid #03a9f4;">
            ⚡ Video sẽ được ghi hình trực tiếp. Quá trình render dùng phần cứng nên sẽ mượt và nhẹ máy! Có thể chuyển tab khác thoải mái.
        </div>
        
        <div class="export-preview-container">
            <div id="spotify-frame-preview" class="spotify-frame">
                <div class="sf-background"></div>
                <div class="sf-glow"></div>
                <div class="sf-content">
                    <div class="sf-top">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" transform="rotate(180 12 12)"></path></svg>
                        <span>ĐANG PHÁT</span>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                    </div>
                    <div class="sf-art-container"><img id="sf-art" src="" alt="Art" style="border-radius:50%"></div>
                    <div class="sf-info">
                        <div class="sf-text">
                            <div class="sf-title-wrapper"><h3 id="sf-title">Tên bài hát</h3></div>
                            <p id="sf-artist">Nghệ sĩ</p>
                        </div>
                        <button class="sf-like-btn active"><svg viewBox="0 0 24 24" width="24" height="24" fill="#1DB954"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></button>
                    </div>
                    <div class="sf-progress-container">
                        <div class="sf-progress-bar"><div class="sf-progress-fill"></div></div>
                        <div class="sf-time"><span>0:00</span><span>3:45</span></div>
                    </div>
                    <div class="sf-controls">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="#1DB954"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></svg>
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg>
                        <div class="sf-play-pause"><svg viewBox="0 0 24 24" width="44" height="44" fill="black"><path d="M8 5v14l11-7z"></path></svg></div>
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="#1DB954"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="export-options">
            <div class="option-group">
                <label>Chất lượng xuất:</label>
                <select id="export-resolution"><option value="720">720p (Nhanh)</option><option value="1080" selected>1080p (Nét)</option></select>
            </div>
            <div class="export-actions">
                <button id="download-mp3-btn" class="action-btn secondary">Tải MP3</button>
                <button id="start-export-btn" class="action-btn primary">Bắt đầu xuất</button>
            </div>
        </div>

        <div id="export-loading-overlay" style="display:none;">
            <div class="loader-spinner"></div>
            <p id="export-status-text">Đang chuẩn bị...</p>
            <div class="export-progress-bar"><div id="export-progress-fill"></div></div>
            <p id="export-warning-text" style="color: #ff9800; font-size: 0.85em; margin-top: 10px; padding: 0 10px; text-align: center;">⚠️ Đang ghi hình trực tiếp... Vui lòng giữ nguyên tab này cho đến khi hoàn thành!</p>
            <button id="cancel-export-btn" class="action-btn secondary" style="margin-top: 20px; border-color: #f44336; color: #f44336; width: fit-content; align-self: center; padding: 8px 24px; border-radius: 20px; height: auto;">Hủy Xuất (Dừng)</button>
        </div>
    </div>
</div>
<!-- ĐÃ FIX: Để position fixed tàng hình thay vì display none để tránh trình duyệt dọn rác canvas -->
<canvas id="export-canvas" style="position: fixed; top: -9999px; left: -9999px; opacity: 0; pointer-events: none; z-index: -1;"></canvas>
`;

let currentExportSong = null;

function initVideoExportUI() {
    let container = document.getElementById('video-export-modal-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'video-export-modal-container';
        document.body.appendChild(container);
    }
    container.innerHTML = videoExportModalHTML;
    setupEventListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoExportUI);
} else {
    initVideoExportUI();
}

function setupEventListeners() {
    document.getElementById('close-export-modal').onclick = () => {
        document.getElementById('video-export-modal').style.display = 'none';
        isExportCancelled = true;
    };
    document.getElementById('cancel-export-btn').onclick = () => {
        isExportCancelled = true;
    };
    document.getElementById('download-mp3-btn').onclick = () => {
        if (!currentExportSong) return;
        const a = document.createElement('a'); a.href = currentExportSong.audioSrc;
        a.download = `${currentExportSong.title}.mp3`; a.click();
    };
    document.getElementById('start-export-btn').onclick = startVideoExport;
}

window.openVideoExportModal = async (song) => {
    currentExportSong = song;
    isExportCancelled = false;
    document.getElementById('video-export-modal').style.display = 'flex';
    document.getElementById('sf-art').src = song.artUrl;
    document.getElementById('sf-title').textContent = song.title;
    document.getElementById('sf-artist').textContent = song.artistData;

    const titleEl = document.getElementById('sf-title');
    if (song.title.length > 25) titleEl.classList.add('marquee');
    else titleEl.classList.remove('marquee');

    const color = await getDominantColor(song.artUrl);
    document.querySelector('.sf-background').style.background = `linear-gradient(to bottom, ${color}, #121212)`;
    const glow = document.querySelector('.sf-glow');
    glow.style.boxShadow = `0 0 100px 50px ${color}44`;
};

async function getDominantColor(imgUrl) {
    return new Promise((resolve) => {
        const img = new Image(); img.crossOrigin = "Anonymous"; img.src = imgUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
            canvas.width = 1; canvas.height = 1; ctx.drawImage(img, 0, 0, 1, 1);
            const data = ctx.getImageData(0, 0, 1, 1).data;
            resolve(`rgb(${data[0]}, ${data[1]}, ${data[2]})`);
        };
        img.onerror = () => resolve('#e91e63');
    });
}

function formatTime(secs) {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

async function analyzeAudio(buffer) {
    const context = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    const source = context.createBufferSource(); source.buffer = buffer;
    const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 150;
    source.connect(filter); filter.connect(context.destination);
    source.start(0);
    const renderedBuffer = await context.startRendering();
    const rawData = renderedBuffer.getChannelData(0);
    const step = Math.floor(renderedBuffer.sampleRate / 30);
    const analysis = [];
    for (let i = 0; i < rawData.length; i += step) {
        let max = 0;
        for (let j = 0; j < step && (i + j) < rawData.length; j++) max = Math.max(max, Math.abs(rawData[i + j]));
        analysis.push(max);
    }
    return analysis;
}

async function startVideoExport() {
    isExportCancelled = false;
    const loading = document.getElementById('export-loading-overlay');
    const statusText = document.getElementById('export-status-text');
    const progressFill = document.getElementById('export-progress-fill');
    const res = parseInt(document.getElementById('export-resolution').value);

    loading.style.display = 'flex'; statusText.textContent = "Đang tải âm thanh..."; progressFill.style.width = '0%';

    try {
        const response = await fetch(currentExportSong.audioSrc);
        const arrayBuffer = await response.arrayBuffer();
        if (isExportCancelled) throw new Error("CANCELLED");

        const audioCtx = new AudioContext();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

        statusText.textContent = "Phân tích dải Bass...";
        const bassData = await analyzeAudio(audioBuffer);

        if (isExportCancelled) throw new Error("CANCELLED");

        const canvas = document.getElementById('export-canvas');
        const ctx = canvas.getContext('2d', { alpha: false }); // Tối ưu phần cứng cho Canvas
        const width = (res === 1080) ? 1080 : 720;
        const height = (res === 1080) ? 1920 : 1280;
        canvas.width = width; canvas.height = height;

        const fps = 30; const totalFrames = Math.floor(audioBuffer.duration * fps);
        const img = new Image(); img.crossOrigin = "Anonymous"; img.src = currentExportSong.artUrl;
        await new Promise(r => img.onload = r);
        const dominantColor = await getDominantColor(currentExportSong.artUrl);

        if (!useWebMFallback) {
            // Chế độ FFmpeg cũ giữ lại dự phòng
            try {
                if (!ffmpeg) { ffmpeg = createFFmpeg({ log: false }); await ffmpeg.load(); }
                if (isExportCancelled) throw new Error("CANCELLED");

                for (let i = 0; i < totalFrames; i++) {
                    if (isExportCancelled) {
                        for (let j = 0; j < i; j++) { try { ffmpeg.FS('unlink', `f-${j.toString().padStart(6, '0')}.jpg`); } catch { } }
                        throw new Error("CANCELLED");
                    }
                    await drawFrame(ctx, i, fps, width, height, img, dominantColor, bassData, audioBuffer.duration);
                    ffmpeg.FS('writeFile', `f-${i.toString().padStart(6, '0')}.jpg`, await canvasToUint8Array(canvas));
                    progressFill.style.width = `${(i / totalFrames) * 100}%`;
                    statusText.textContent = `Rendering (Chậm): ${Math.round((i / totalFrames) * 100)}%`;
                }

                if (isExportCancelled) throw new Error("CANCELLED");
                statusText.textContent = "Gộp audio và video...";
                ffmpeg.FS('writeFile', 'a.mp3', new Uint8Array(arrayBuffer));
                await ffmpeg.run('-framerate', '30', '-i', 'f-%06d.jpg', '-i', 'a.mp3', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', 'o.mp4');
                const data = ffmpeg.FS('readFile', 'o.mp4');
                downloadBlob(new Blob([data.buffer], { type: 'video/mp4' }), 'mp4');
                for (let i = 0; i < totalFrames; i++) ffmpeg.FS('unlink', `f-${i.toString().padStart(6, '0')}.jpg`);
                ffmpeg.FS('unlink', 'a.mp3'); ffmpeg.FS('unlink', 'o.mp4');
                loading.style.display = 'none'; showNotification("Thành công!");
            } catch (err) {
                if (err.message === "CANCELLED") throw err;
                console.warn("Lỗi FFmpeg, tự động chuyển sang WebM:", err);
                useWebMFallback = true; return startVideoExport();
            }
        } else {
            // ==========================================
            // CHẾ ĐỘ MỚI: XUẤT WEBM REALTIME - FIX CHUYỂN TAB
            // ==========================================
            const chunks = [];
            const stream = canvas.captureStream(fps);
            const destination = audioCtx.createMediaStreamDestination();
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(destination);
            stream.addTrack(destination.stream.getAudioTracks()[0]);

            let mimeType = 'video/webm';
            if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
                mimeType = 'video/webm; codecs=vp9';
            } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8')) {
                mimeType = 'video/webm; codecs=vp8';
            }

            const recorder = new MediaRecorder(stream, { mimeType: mimeType, videoBitsPerSecond: 8000000 });
            recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
            recorder.onstop = async () => {
                if (isExportCancelled) return;

                loading.style.display = 'flex';
                statusText.textContent = "Đang chuyển đổi sang MP4 (Vui lòng đợi 1-2 phút)...";
                progressFill.style.width = '100%';

                try {
                    const webmBlob = new Blob(chunks, { type: mimeType });
                    const webmBuffer = await webmBlob.arrayBuffer();

                    if (!ffmpeg) {
                        ffmpeg = createFFmpeg({ log: false });
                        await ffmpeg.load();
                    }

                    ffmpeg.FS('writeFile', 'temp.webm', new Uint8Array(webmBuffer));
                    await ffmpeg.run(
                        '-i', 'temp.webm',
                        '-c:v', 'libx264',
                        '-preset', 'ultrafast',
                        '-pix_fmt', 'yuv420p',
                        '-c:a', 'aac',
                        'output.mp4'
                    );

                    const mp4Data = ffmpeg.FS('readFile', 'output.mp4');
                    downloadBlob(new Blob([mp4Data.buffer], { type: 'video/mp4' }), 'mp4');

                    ffmpeg.FS('unlink', 'temp.webm');
                    ffmpeg.FS('unlink', 'output.mp4');

                    showNotification("Đã xuất thành công file MP4!");
                } catch (err) {
                    console.error("Lỗi convert MP4:", err);
                    downloadBlob(new Blob(chunks, { type: mimeType }), 'webm');
                    showNotification("Không thể tạo MP4, đã tải video WebM gốc.");
                }

                loading.style.display = 'none';
            };

            recorder.start(1000);
            source.start(0);

            let frame = 0;
            let startTime = audioCtx.currentTime;

            // --- WEB WORKER HACK: ÉP RENDER KHI CHUYỂN TAB ---
            const workerCode = `
                let timer = null;
                self.onmessage = function(e) {
                    if (e.data === 'start') {
                        // Tick 30 lần 1 giây
                        timer = setInterval(() => postMessage('tick'), 1000 / 30); 
                    } else if (e.data === 'stop') {
                        clearInterval(timer);
                    }
                };
            `;
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const timerWorker = new Worker(URL.createObjectURL(blob));

            let isDrawing = false; // Cờ bảo vệ RAM máy yếu

            timerWorker.onmessage = async () => {
                if (isExportCancelled) {
                    recorder.stop(); source.stop(); timerWorker.postMessage('stop');
                    return;
                }

                // Nếu máy yếu vẽ không kịp, bỏ qua frame này để tránh treo máy
                if (isDrawing) return; 
                isDrawing = true;

                let currentTime = audioCtx.currentTime - startTime;
                frame = Math.floor(currentTime * fps);

                if (currentTime >= audioBuffer.duration || frame >= totalFrames) {
                    recorder.stop(); source.stop(); timerWorker.postMessage('stop');
                    return;
                }

                // Vẽ frame
                await drawFrame(ctx, frame, fps, width, height, img, dominantColor, bassData, audioBuffer.duration);

                // Giảm tải DOM: Chỉ update UI tiến trình mỗi 10 frame (3 lần/giây)
                if (frame % 10 === 0) {
                    let percent = (currentTime / audioBuffer.duration) * 100;
                    progressFill.style.width = `${percent}%`;
                    statusText.textContent = `Đang ghi hình trực tiếp... ${Math.round(percent)}%`;
                }
                
                isDrawing = false; // Mở khóa vẽ frame tiếp theo
            };

            timerWorker.postMessage('start'); // Khởi động Web Worker
        }
    } catch (e) {
        if (e.message === "CANCELLED") {
            statusText.textContent = "Đã hủy xuất video.";
            showNotification("Đã dừng quá trình xuất video.");
        } else {
            console.error(e);
            statusText.textContent = "Đã xảy ra lỗi!";
        }
        setTimeout(() => loading.style.display = 'none', 3000);
    }
}

async function drawFrame(ctx, i, fps, width, height, img, dominantColor, bassData, duration) {
    const time = i / fps;
    const bassValue = bassData[Math.floor(time * 30)] || 0;
    const pulse = 1 + (bassValue * 0.15);

    ctx.shadowBlur = 0;
    ctx.fillStyle = dominantColor;
    ctx.fillRect(0, 0, width, height);
    const grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, "rgba(0,0,0,0.2)");
    grd.addColorStop(1, '#121212');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    const rawArtSize = width * 0.7;
    const artSize = rawArtSize * pulse;
    const cx = width / 2;
    const cy = height * 0.4;

    ctx.save();
    ctx.translate(cx, cy);

    const numBars = 80;
    const radius = (rawArtSize / 2 * pulse) + 8;

    for (let j = 0; j < numBars; j++) {
        const MathPI2 = Math.PI * 2;
        const angle = (j / numBars) * MathPI2 + (Math.PI / 2);
        const symIndex = j < numBars / 2 ? j : numBars - j; 

        let freqReact = 0;
        if (symIndex < 10) {
            freqReact = bassValue * (1 - symIndex / 10) * 1.8;
        } else if (symIndex < 25) {
            freqReact = bassValue * (Math.sin(symIndex * 0.5 + time * 8) * 0.5 + 0.5) * 0.9;
        } else {
            freqReact = bassValue * (Math.cos(symIndex * 0.8 - time * 12) * 0.5 + 0.5) * 0.6;
        }

        const noise = Math.sin(symIndex * 0.6 + time * 10) * 0.5 + 0.5;
        const noise2 = Math.cos(symIndex * 0.3 - time * 15) * 0.5 + 0.5;
        let barHeight = 8 + (noise * noise2 * 50 * pulse) + (freqReact * 140);

        ctx.save();
        ctx.rotate(angle);
        ctx.translate(radius, 0);

        const hue = ((time * 100) + symIndex * 6) % 360; 
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;

        if (bassValue > 0.5) {
            ctx.shadowBlur = 8; 
            ctx.shadowColor = ctx.fillStyle;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(0, -3, barHeight, 6, 3);
        } else {
            ctx.rect(0, -3, barHeight, 6);
        }
        ctx.fill();
        ctx.restore();
    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.shadowBlur = 10; 
    ctx.shadowColor = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, (rawArtSize / 2 * pulse), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.shadowBlur = 0;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rawArtSize / 2 * pulse, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, cx - (artSize / 2), cy - (artSize / 2), artSize, artSize);
    ctx.restore();

    ctx.fillStyle = "white"; ctx.textAlign = "center";
    ctx.font = `bold ${width * 0.052}px Inter, sans-serif`;
    const titleY = height * 0.75;

    const title = currentExportSong.title;
    const titleWidth = ctx.measureText(title).width;
    if (titleWidth > width * 0.8) {
        const offset = (time * 80) % (titleWidth + 200);
        ctx.save(); ctx.beginPath(); ctx.rect(width * 0.1, titleY - 60, width * 0.8, 120); ctx.clip();
        ctx.fillText(title, (width / 2) + 200 - offset, titleY); ctx.restore();
    } else {
        ctx.fillText(title, width / 2, titleY);
    }

    ctx.font = `${width * 0.038}px Inter, sans-serif`; ctx.fillStyle = "#b3b3b3";
    ctx.fillText(currentExportSong.artistData, width / 2, titleY + width * 0.06);

    const barY = height * 0.88; const barW = width * 0.85;
    ctx.fillStyle = "#535353"; ctx.fillRect((width - barW) / 2, barY, barW, 6);
    ctx.fillStyle = "white"; ctx.fillRect((width - barW) / 2, barY, barW * (time / duration), 6);

    ctx.beginPath();
    ctx.arc(((width - barW) / 2) + (barW * (time / duration)), barY + 3, 10, 0, Math.PI * 2);
    ctx.fillStyle = "white"; ctx.fill();

    ctx.font = `bold ${width * 0.030}px Inter, sans-serif`;
    ctx.fillStyle = "#b3b3b3";
    ctx.textAlign = "left";
    ctx.fillText(formatTime(time), (width - barW) / 2, barY - 15);
    ctx.textAlign = "right";
    ctx.fillText(formatTime(duration), (width - barW) / 2 + barW, barY - 15);
}

function downloadBlob(blob, ext) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `${currentExportSong.title}.${ext}`; a.click();
}

async function canvasToUint8Array(canvas) {
    return new Promise(resolve => {
        canvas.toBlob(blob => {
            blob.arrayBuffer().then(buffer => resolve(new Uint8Array(buffer)));
        }, 'image/jpeg', 0.7); 
    });
}