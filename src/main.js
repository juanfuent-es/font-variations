import './style.css'
import VariableFont from './font/variable_font'
import GlyphMorph from './font/glyph_morph'
class Variable {
    constructor(_container) {
        this.font = new VariableFont('/HubotSans.ttf')
        this.font.addEventListener('fontloaded', () => this.setup())
    }
    
    setup() {
        this.glyph_morph = new GlyphMorph('W', this.font)
        this.glyph_morph.appendSVG()
    }

}

const variation = new Variable()