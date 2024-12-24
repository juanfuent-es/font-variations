import './style.css'
import VariableFont from './font/variable_font'
import GlyphMorph from './font/glyph_morph'

class MorphVariations {
    constructor() {
        this.font = new VariableFont('/HubotSans.ttf')
        this.font.addEventListener('fontloaded', () => this.setup())
    }
    
    setup() {
        this.glyph_morph = new GlyphMorph('R', this.font)
        this.glyph_morph.appendSVG()
        this.glyph_morph.animate()
    }

}

const variation = new MorphVariations()