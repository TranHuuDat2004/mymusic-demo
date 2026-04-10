/**
 * visualizer.js
 * Handles real-time audio visualization using Web Audio API on the right sidebar.
 * ĐÃ FIX FINAL: Ảnh đập cực mượt, sóng nhạc đánh nét căng y hệt bản Export Video.
 */

let audioCtx = null;
let analyser = null;
let sourceNode = null;
let dataArray = null;
let animationId = null;

let currentArtUrl = ""; 
let cachedArtImage = new Image(); 
cachedArtImage.crossOrigin = "Anonymous";
cachedArtImage.src = "img/favicon.png";

let isVisualizerInit = false;

// Biến lưu trữ giá trị bass đã được làm mượt để ảnh đập không bị giật (jitter)
let smoothedBass = 0; 

window.initVisualizer = (audioElement) => {
    if (isVisualizerInit) return;
    
    const canvas = document.getElementById('visualizer-canvas');
    if (!canvas) return;

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        
        sourceNode = audioCtx.createMediaElementSource(audioElement);
        sourceNode.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        // fftSize 512 là chuẩn, nhưng ta sẽ chỉ lấy các dải thấp nhất
        analyser.fftSize = 512; 
        analyser.smoothingTimeConstant = 0.1; // Cực thấp để bắt chính xác nhịp đập tức thì (Punchy)
        
        const bufferLength = analyser.frequencyBinCount; 
        dataArray = new Uint8Array(bufferLength);
        
        isVisualizerInit = true;
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        console.log("Visualizer initialized successfully.");
    } catch (e) {
        console.warn("Could not initialize visualizer.", e);
    }
};

window.setCurrentVisualizerArt = (artUrl) => {
    if (!artUrl) return; 
    if (currentArtUrl !== artUrl) {
        currentArtUrl = artUrl;
        cachedArtImage.src = artUrl; 
    }
};

window.startVisualizer = () => {
    if (!isVisualizerInit || animationId) return;
    
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const canvas = document.getElementById('visualizer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
        if (!isVisualizerInit) return;
        animationId = requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        // FIX 1: LỌC BASS THÔNG MINH HƠN (Noise Gate & Average)
        // Lấy trung bình 5 dải đầu tiên (tương đương dải siêu trầm ~0-200Hz)
        let sumBass = 0;
        for(let i = 0; i < 5; i++) {
            sumBass += dataArray[i];
        }
        let rawAvgBass = (sumBass / 5) / 255.0;
        
        // Hạ threshold (0.28) gắt hơn, để nhạy với nhiều loại kick drum
        let activeBass = Math.max(0, rawAvgBass - 0.28) * 2.2; 
        activeBass = Math.min(1.2, activeBass);
        
        // Logic lò xo "Punchy": Lên thì lên tức thì (0 delay), xuống thì từ từ
        if (activeBass > smoothedBass) {
            smoothedBass = activeBass;
        } else {
            smoothedBass = smoothedBass * 0.85 + activeBass * 0.15;
        }
        
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        
        if (w > 0 && h > 0) {
            // Truyền cả activeBass (cho sóng nảy nhanh) và smoothedBass (cho ảnh nảy mượt)
            drawRealTimeFrame(ctx, w, h, activeBass, smoothedBass); 
        }
    };
    
    draw();
};

window.stopVisualizer = () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
};

// Main draw logic
function drawRealTimeFrame(ctx, width, height, fastBass, smoothBass) {
    // Ảnh dùng smoothBass để giãn nở mượt mà
    const pulse = 1 + (smoothBass * 0.15); 
    
    ctx.clearRect(0, 0, width, height);

    const rawArtSize = Math.min(width, height) * 0.42;
    const artSize = rawArtSize * pulse;
    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    ctx.translate(cx, cy);

    const numBars = 80;
    const radius = (rawArtSize / 2 * pulse) + 8;
    const time = Date.now() / 1000; 

    // Vẽ thanh sóng nhạc
    for (let j = 0; j < numBars; j++) {
        const MathPI2 = Math.PI * 2;
        const angle = (j / numBars) * MathPI2 + (Math.PI / 2);
        const symIndex = j < numBars / 2 ? j : numBars - j; 

        // FIX 3: COPY CHUẨN TOÁN HỌC TỪ BẢN EXPORT
        // Trộn một ít tần số thật để sóng nhìn sinh động, nhưng chủ đạo vẫn là fastBass đập
        const arrayIndex = Math.floor((symIndex / 40) * 50); 
        let realFreq = dataArray[arrayIndex] / 255.0;
        let mixedValue = (realFreq * 0.25) + (fastBass * 0.75); // Thiên về nhịp đập 

        let freqReact = 0;
        if (symIndex < 10) {
            freqReact = mixedValue * (1 - symIndex / 10) * 1.8;
        } else if (symIndex < 25) {
            freqReact = mixedValue * (Math.sin(symIndex * 0.5 + time * 8) * 0.5 + 0.5) * 0.9;
        } else {
            freqReact = mixedValue * (Math.cos(symIndex * 0.8 - time * 12) * 0.5 + 0.5) * 0.6;
        }

        const noise = Math.sin(symIndex * 0.6 + time * 10) * 0.5 + 0.5;
        const noise2 = Math.cos(symIndex * 0.3 - time * 15) * 0.5 + 0.5;
        
        let barHeight = 8 + (noise * noise2 * 50 * pulse) + (freqReact * 140);

        ctx.save();
        ctx.rotate(angle);
        ctx.translate(radius, 0);

        const hue = ((time * 100) + symIndex * 6) % 360; 
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;

        if (fastBass > 0.4) {
            ctx.shadowBlur = 10; 
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

    // Viền sáng vòng tròn
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = fastBass > 0.4 ? 15 : 5; // Viền cũng nháy theo nhạc 
    ctx.shadowColor = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, (rawArtSize / 2 * pulse), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.shadowBlur = 0;

    // HIỆU ỨNG XOAY ĐĨA NHẠC CHO ẢNH BÌA
    if (cachedArtImage.complete && cachedArtImage.naturalWidth > 0) {
        ctx.save();
        ctx.translate(cx, cy); 
        
        // Xoay đĩa nhạc rõ ràng hơn: 1 rad/giây
        ctx.rotate(time); 
        
        ctx.beginPath();
        ctx.arc(0, 0, rawArtSize / 2 * pulse, 0, Math.PI * 2); 
        ctx.clip();
        
        ctx.drawImage(cachedArtImage, -artSize / 2, -artSize / 2, artSize, artSize);
        ctx.restore();
    }
}

function resizeCanvas() {
    const container = document.querySelector('.visualizer-container');
    const canvas = document.getElementById('visualizer-canvas');
    if (container && canvas) {
        const pr = window.devicePixelRatio || 1;
        
        const w = container.clientWidth;
        const h = container.clientHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        canvas.width = w * pr;
        canvas.height = h * pr;
        
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        
        ctx.scale(pr, pr);
    }
}