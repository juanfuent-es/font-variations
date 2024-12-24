/*
* Morph Variations
* Morphing between two glyphs using GSAP MorphSVGPlugin
* Author: JuanFuent.es
*/
import './style.css'
import VariableFont from './font/variable_font'
import GlyphMorph from './font/glyph_morph'

class MorphVariations {
    constructor() {
        this.container = document.body
        this.font = new VariableFont('/HubotSans.ttf')
        this.font.addEventListener('fontloaded', () => this.setup())
    }
    
    setup() {
        const glyph_morph = new GlyphMorph('W', this.font)
        const svg = glyph_morph.createSVG()

        const path_a = glyph_morph.createSVGPath(glyph_morph.minGlyph.svgPathData, "#FFF", "start")
        path_a.setAttribute('id', "path_a");
        svg.appendChild(path_a)
        //
        const path_b = glyph_morph.createSVGPath(glyph_morph.maxGlyph.svgPathData, "transparent", "end")
        path_b.setAttribute('id', "path_b");
        svg.appendChild(path_b)
        //
        this.container.appendChild(svg)

    }

}

const variation = new MorphVariations()