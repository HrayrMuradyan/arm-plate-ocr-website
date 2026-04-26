const imageInput = document.getElementById('imageInput');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const resultSection = document.getElementById('resultSection');
const plateResult = document.getElementById('plateResult');
const loading = document.getElementById('loading');

imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        imagePreview.src = event.target.result;
        previewSection.style.display = 'block';
        resultSection.style.display = 'none';
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
        loading.style.display = 'flex';
        plateResult.textContent = '-- -- ---'; 

        const response = await fetch('https://hrayrmuradyan-arm-plate-ocr-main.hf.space/api/extract-plate', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        
        const data = await response.json();
        
        loading.style.display = 'none';
        resultSection.style.display = 'block';
        plateResult.textContent = data.plate;

    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        alert('An error occurred while processing the image. Please try again.');
    }
});
