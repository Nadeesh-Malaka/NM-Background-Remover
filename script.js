const API_KEY = 'zNtRc2s9sKWb5cW91xVZ2rVW'; // Your API key
const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const uploadText = document.getElementById('uploadText');
const removeImageBtn = document.getElementById('removeImageBtn');
const removeBgBtn = document.getElementById('removeBgBtn');
const resultSection = document.querySelector('.result-section');
const resultCanvas = document.getElementById('resultCanvas');
const eraseBtn = document.getElementById('eraseBtn');
const restoreBtn = document.getElementById('restoreBtn');
const brushSize = document.getElementById('brushSize');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

let ctx = resultCanvas.getContext('2d');
let originalImage = new Image();
let processedImage = new Image();
let isErasing = false;
let isRestoring = false;
let drawing = false;

// Trigger file input when clicking the upload area
document.querySelector('.upload-area').addEventListener('click', () => {
    imageUpload.click();
});

// Load image and display in upload area
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedImage.src = event.target.result;
            uploadedImage.style.display = 'block';
            uploadText.style.display = 'none';
            removeImageBtn.style.display = 'inline-block';
            removeBgBtn.style.display = 'inline-block';
            originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Remove uploaded image
removeImageBtn.addEventListener('click', () => {
    uploadedImage.src = '';
    uploadedImage.style.display = 'none';
    uploadText.style.display = 'block';
    removeImageBtn.style.display = 'none';
    removeBgBtn.style.display = 'none';
    resultSection.style.display = 'none';
    imageUpload.value = '';
});

// Remove background using API
removeBgBtn.addEventListener('click', async () => {
    const file = imageUpload.files[0];
    if (!file) {
        alert('Please upload an image first!');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', file);

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to remove background');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        processedImage.src = url;
        processedImage.onload = () => {
            resultCanvas.width = processedImage.width;
            resultCanvas.height = processedImage.height;
            ctx.drawImage(processedImage, 0, 0);
            resultSection.style.display = 'block';
        };
    } catch (error) {
        console.error('Error removing background:', error);
        alert('Failed to remove background. Please try again.');
    }
});

// Drawing functionality for erase/restore
resultCanvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e);
});

resultCanvas.addEventListener('mousemove', (e) => {
    if (drawing) draw(e);
});

resultCanvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

eraseBtn.addEventListener('click', () => {
    isErasing = true;
    isRestoring = false;
});

restoreBtn.addEventListener('click', () => {
    isErasing = false;
    isRestoring = true;
});

function draw(e) {
    if (!drawing) return;

    const rect = resultCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';

    if (isErasing) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (isRestoring) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(originalImage, 0, 0);
        ctx.drawImage(processedImage, 0, 0);
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Reset canvas
resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
    ctx.drawImage(processedImage, 0, 0);
});

// Download result as PNG with transparent background
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'background-removed.png';
    link.href = resultCanvas.toDataURL('image/png');
    link.click();
});