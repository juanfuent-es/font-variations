/*
* Morph Variations
* Morphing between two glyphs using GSAP MorphSVGPlugin
* Author: JuanFuent.es
*/
import './style.css'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import VariableFont from './font/variable_font';
import GlyphMorph from './font/glyph_morph';

class MorphVariations {
    constructor() {
        this.container = document.body;
        this.font = new VariableFont('/HubotSans.ttf');
        this.font.addEventListener('fontloaded', () => this.setup());
    }
    
    setup() {
        const glyph_morph = new GlyphMorph('W', this.font);
        const svg = glyph_morph.createSVG();

        const path_a = glyph_morph.createSVGPath(glyph_morph.minGlyph.svgPathData, "#FFF");
        svg.appendChild(path_a);
        const path_b = glyph_morph.createSVGPath(glyph_morph.maxGlyph.svgPathData, "transparent");
        svg.appendChild(path_b);
        this.initThreeJS(svg);
    }

    initThreeJS(svg) {
        // Create the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 100;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Add orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Convert SVG paths to Three.js mesh
        const loader = new SVGLoader();
        const svgData = loader.parse(svg.outerHTML);

        svgData.paths.forEach(path => {
            const material = new THREE.MeshBasicMaterial({
                color: path.userData.style.fill,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const shapes = SVGLoader.createShapes(path);

            shapes.forEach(shape => {
                const extrudeSettings = {
                    depth: 10,
                    bevelEnabled: true,
                    bevelSegments: 2,
                    steps: 2,
                    bevelSize: 1,
                    bevelThickness: 1
                };
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                const mesh = new THREE.Mesh(geometry, material);
                this.scene.add(mesh);
            });
        });

        // Render the scene
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

const variation = new MorphVariations();