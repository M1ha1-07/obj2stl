import { processObjToStl } from './converter.js';

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const stateDefault = document.getElementById('state-default');
const stateLoading = document.getElementById('state-loading');
const successBox = document.getElementById('success-box');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA Setup Complete'))
            .catch(err => console.error('PWA Registration Failed', err));
    });
}
dropzone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelection(e.target.files[0]);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
    }, false);
});

dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length === 0) return;
    
    const file = files[0];
    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith('.obj')) {
        alert(`Whoops! You uploaded a ${fileName.split('.').pop().toUpperCase()} file. This tool only accepts .OBJ files.`);
        return; // Stop the function here
    }

    if (file.size > 500 * 1024 * 1024) {
        alert("This file is over 500MB! Your browser might struggle to process a mesh this large in memory.");
    }

    handleFileSelection(file);
});

async function handleFileSelection(file) {
   
    stateDefault.classList.add('hidden');
    stateLoading.classList.remove('hidden');
    successBox.classList.add('hidden');

    try {
        await processObjToStl(file);
        
       
        stateLoading.classList.add('hidden');
        stateDefault.classList.remove('hidden');
        successBox.classList.remove('hidden');
    } catch (err) {
        alert("Error parsing mesh. Ensure the file isn't corrupted.");
        stateLoading.classList.add('hidden');
        stateDefault.classList.remove('hidden');
        console.error(err);
    }
}