const uploadInput = document.getElementById('uploadInput');
const openUpload = document.getElementById('openUpload');
const openCamera = document.getElementById('openCamera');
const closeCamera = document.getElementById('closeCamera');
const captureBtn = document.getElementById('capture');
const deleteBtn = document.getElementById('deleteBtn');
const preview = document.getElementById('preview');
const previewBox = document.querySelector('.preview-box');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
let currentImageBlob = null;
let stream = null;

// Mở file
openUpload.onclick = () => uploadInput.click();

uploadInput.onchange = (e) => {
  const file = e.target.files[0];
  if (file) {
    currentImageBlob = file;
    preview.src = URL.createObjectURL(file);
    preview.alt = "";
    deleteBtn.classList.remove('hidden');
    stopCamera();
  }
};

// Mở camera
openCamera.onclick = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.classList.remove('hidden');
    captureBtn.classList.remove('hidden');
    closeCamera.classList.remove('hidden');
    openCamera.classList.add('hidden');
    openUpload.classList.add('hidden');
    deleteBtn.classList.add('hidden');
    preview.src = '';
    preview.alt = 'Ảnh sẽ hiển thị ở đây';
  } catch (err) {
    alert("Không thể truy cập camera: " + err);
  }
};

// Tắt camera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  video.classList.add('hidden');
  captureBtn.classList.add('hidden');
  closeCamera.classList.add('hidden');
  openCamera.classList.remove('hidden');
  openUpload.classList.remove('hidden');
}

closeCamera.onclick = () => stopCamera();

// Chụp từ camera
captureBtn.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  canvas.toBlob(blob => {
    currentImageBlob = blob;
    preview.src = URL.createObjectURL(blob);
    preview.alt = "";
    deleteBtn.classList.remove('hidden');
    stopCamera();
  }, 'image/jpeg');
};

// Xóa ảnh
deleteBtn.onclick = () => {
  preview.src = '';
  preview.alt = 'Ảnh sẽ hiển thị ở đây';
  currentImageBlob = null;
  deleteBtn.classList.add('hidden');
};
