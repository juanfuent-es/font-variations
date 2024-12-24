/*
* Morph Variations
* Morphing between two glyphs using GSAP MorphSVGPlugin
* Author: JuanFuent.es
*/
import './style.css'
import VariableFont from './font/variable_font'
import GlyphMorph from './font/glyph_morph'

gsap.registerPlugin(MorphSVGPlugin)

class MorphVariations {
    constructor() {
        this.container = document.body
        this.font = new VariableFont('/HubotSans.ttf')
        this.font.addEventListener('fontloaded', () => this.setup())
    }
    
    setup() {
        const glyph_morph = new GlyphMorph('R', this.font)
        const svg = glyph_morph.createSVG()

        const path_a = glyph_morph.createSVGPath(glyph_morph.minGlyph.svgPathData, "#FFF")
        path_a.setAttribute('id', "path_a");
        svg.appendChild(path_a)
        //
        const path_b = glyph_morph.createSVGPath(glyph_morph.maxGlyph.svgPathData, "transparent")
        path_b.setAttribute('id', "path_b");
        svg.appendChild(path_b)
        //
        this.container.appendChild(svg)

        this.animate()
    }


    animate() {
        // Requires GSAP license to work with MorphSVGPlugin on production
        gsap.to("#path_a", {
            duration: 2,
            morphSVG: "#path_b",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

}

const variation = new MorphVariations()