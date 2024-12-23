import './style.css'
import Canvas from "./canvas.js"
import Char from "./fonts/char"
import VFont from './vfont.js'

class App extends Canvas {
    constructor(_container) {
        super()
        this.container = document.querySelector("main")
        this.container.appendChild(this.canvas)
        // font settings
        this.txt = "W"
        this.chars = []
        this.fontSize = 300
        this.scale = 1 / 1024 * this.fontSize // 1024 default set value, see: https://github.com/foliojs/fontkit/blob/13bf703d6c01acbb3d36437ba90c119501186512/test/metadata.js
        // 
        this.font = new VFont('/HubotSans.ttf')
        this.font.addEventListener('fontloaded', () => this.setChars())
        this.setSize()
        this.animate()
    }

    setChars() {
        for (let i = 0; i < this.txt.length; i++) {
            const char = this.txt[i]
            const glyphVariation = this.font.glyphVariation(char)
            this.createCharFromGlyph(glyphVariation)
        }
    }

    createCharFromGlyph(_glyph) {
        const glyph = _glyph
        const char = new Char(glyph.name, {
            fontSize: this.fontSize,
            commands: glyph.path.commands,
            width: glyph.advanceWidth,
            height: glyph.advanceHeight,
            scale: this.scale,
            bbox: glyph.bbox,
            lineHeight: .75,
            metrics: glyph._metrics
        })
        this.chars.push(char)
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.clear()
        this.context.strokeStyle = "#FFF"
        this.context.fillStyle = "#FF0"
        this.drawChars(this.context)
    }

    drawChars(_ctx) {
        let offset_x = 0
        for (let i = 0; i < this.chars.length; i++) {
            const char = this.chars[i]
            char.draw(_ctx, {
                offset_x: offset_x
            })
            offset_x += char.width
        }
    }
    
}

const vfont = new App()