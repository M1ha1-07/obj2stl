# obj2stl

A lightweight, client-side web utility that converts `.obj` 3D meshes into binary `.stl` files optimized for 3D printing slicers.

Most online converters require uploading proprietary models to a remote server, sit behind paywalls, or are bloated with ads. This tool is built to be a quiet, offline-capable utility. 

**Zero backend. Zero uploads. Zero telemetry.** All geometry processing happens entirely in your browser's active memory.

## Features

* **100% Local Processing:** Utilizes WebGL and Three.js for native-speed in-browser conversion.
* **Binary STL Export:** Compiles straight to binary `.stl` (stripping heavy color/texture data) to keep files compact for slicers like Cura and PrusaSlicer.
* **PWA Ready:** Can be installed as a standalone desktop or mobile application for offline use.
* **Zero Build Step:** Uses vanilla JavaScript and ES modules. No Node.js, Webpack, or npm required to run the core app.

## Tech Stack

* **Logic:** [Three.js](https://threejs.org/) (`OBJLoader` & `STLExporter`)
* **Styling:** Tailwind CSS (via CDN)
* **Architecture:** Vanilla JS + HTML5 File API

## Local Development

Because this project uses modern JavaScript ES modules (`import`/`export`), you cannot run it by simply double-clicking the `index.html` file. It must be served over a local HTTP server due to browser security policies (CORS).

**Using Python:**
```bash
# Navigate to the project folder
cd obj2stl

# Start a local server
python3 -m http.server 8000
