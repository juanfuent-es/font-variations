import './style.css'
import Canvas from "./components/canvas"
import VariableFont from './font/variable_font'
import GlyphMorph from './font/glyph_morph'
class Variable extends Canvas {
    constructor(_container) {
        super()
        this.container = document.querySelector("body")
        this.container.appendChild(this.canvas)
        //
        this.font = new VariableFont('/HubotSans.ttf')
        this.font.addEventListener('fontloaded', () => this.setup())
    }
    
    setup() {
        this.glyph_morph = new GlyphMorph('A', this.font)
        this.events()
    }

    events() {
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
        this.animate()
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render(this.context)
    }

    render(_ctx) {
        this.clear()
        _ctx.fillStyle = '#FFF'
        this.glyph_morph.draw(_ctx)
    }
    
}

const variation = new Variable()