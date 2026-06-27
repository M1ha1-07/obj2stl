import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

export function processObjToStl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = e => {
            try {
                const loader = new OBJLoader();
                const obj = loader.parse(e.target.result);

                const exporter = new STLExporter();
                const stl = exporter.parse(obj, { binary: true });

                const blob = new Blob([stl], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = file.name.replace(/\.obj$/i, '.stl');
                link.click();

                // cleanup the blob url
                setTimeout(() => URL.revokeObjectURL(url), 100); 

                resolve(url);
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = () => reject(new Error("File read error"));
        reader.readAsText(file);
    });
}
        reader.readAsText(file);
    });
}
