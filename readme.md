# VFont Project

This project demonstrates the use of variable fonts with different classes and functionalities, including morphing between glyphs using GSAP and rendering SVG paths as 3D meshes in Three.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Classes and Documents](#classes-and-documents)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/vfont-project.git
    cd vfont-project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to view the project.

## Classes and Documents

### Text Variation

The `Variation` class in `variation.js` loads a variable font and creates a text variation based on specified parameters such as weight and width. It then generates an SVG to display the text with the applied variations.

### Morph Variation

The `GlyphMorph` class in `glyph_morph.js` interpolates between two variations of a glyph (minimum and maximum values of the axes) using GSAP for animation. It creates an SVG path for each variation and animates the transition between them.

### 3D Glyph

The `MorphVariations` class in `3d_glyph.js` demonstrates morphing between two glyphs using GSAP MorphSVGPlugin and rendering the SVG paths as 3D meshes in Three.js. It sets up a Three.js scene, converts SVG paths to Three.js geometries, and extrudes them to create 3D shapes.

## License

This project is licensed under the GNU License. See the LICENSE file for details.