import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

/** 
 * @param {File} file 
 * @return {Promise<string>} Resolves with download url on complete
 */
export function processObjToStl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                const objText = event.target.result;

                // 1. Parse raw text lines into standard ThreeJS structures
                const loader = new OBJLoader();
                const object3d = loader.parse(objText);

                // 2. Transcode memory instances straight to binary STL array buffer
                const exporter = new STLExporter();
                const stlResult = exporter.parse(object3d, { binary: true });

                // 3. Create a temporary client-side data Blob pointer
                const blob = new Blob([stlResult], { type: 'application/octet-stream' });
                const downloadUrl = URL.createObjectURL(blob);

                // 4. Clean up browser thread and trigger instant pipeline file download
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = file.name.toLowerCase().replace('.obj', '.stl');
                link.click();

                resolve(downloadUrl);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => reject(new Error("Failed to read selected file contents."));
        reader.readAsText(file);
    });
}