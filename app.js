import { processObjToStl } from './converter.js';

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const defaultUI = document.getElementById('state-default');
const loadingUI = document.getElementById('state-loading');
const successUI = document.getElementById('success-box');

// PWA init
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
}

dropzone.onclick = () => fileInput.click();

fileInput.onchange = e => {
    if (e.target.files.length) handleFile(e.target.files[0]);
};

// Drag n drop events
const prevent = e => e.preventDefault();

['dragenter', 'dragover'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
        prevent(e);
        dropzone.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(evt => {
    dropzone.addEventListener(evt, e => {
        prevent(e);
        dropzone.classList.remove('dragover');
    });
});

dropzone.ondrop = e => {
    prevent(e);
    dropzone.classList.remove('dragover');
    
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.obj')) {
        return alert("Only .obj files are supported.");
    }

    if (file.size > 500 * 1024 * 1024) {
        alert("Warning: File is over 500MB, this might crash your browser.");
    }

    handleFile(file);
};

async function handleFile(file) {
    defaultUI.classList.add('hidden');
    successUI.classList.add('hidden');
    loadingUI.classList.remove('hidden');

    try {
        await processObjToStl(file);
        
        loadingUI.classList.add('hidden');
        defaultUI.classList.remove('hidden');
        successUI.classList.remove('hidden');
    } catch (err) {
        console.error(err);
        alert("Error parsing file. Check console.");
        
        loadingUI.classList.add('hidden');
        defaultUI.classList.remove('hidden');
    }
}
