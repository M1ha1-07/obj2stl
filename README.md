# obj2stl

A simple, client-side web utility that converts `.obj` files into binary `.stl` files for 3D printing.

Most online converters upload your files to remote servers or make you sit through ads. I wanted something quiet that I could just drag and drop into. **Everything processes locally in your browser.**

## Features

* **100% Local:** Uses WebGL and Three.js for in-browser conversion. Your files never leave your machine.
* **Binary STL Export:** Exports as a binary `.stl` (stripping out heavy color/texture data) to keep file sizes small for slicers.
* **PWA Support:** Install it as a standalone app and use it offline.
* **Vanilla JS:** Uses native ES modules. No Node.js, Webpack, or build steps needed.

## Tech Stack

* [Three.js](https://threejs.org/) (`OBJLoader` & `STLExporter`)
* Tailwind CSS (via CDN)
* Vanilla JS & HTML5 File API

## Local Development

Because this project uses ES modules (`import`/`export`), you can't run it by just double-clicking `index.html`. You have to serve it over local HTTP to avoid browser CORS errors.

**Using Python:**
```bash
# Navigate to the folder
cd obj2stl

# Start a local server
python3 -m http.server 8000
