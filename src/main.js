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
        const glyph = this.font.glyphVariation("A", {
            wght: 400,
            wdth: 100
        })
        this.createChar(glyph)
        // Example for text with the same variation. Default variation
        const txt = this.font.textVariation("Hola")
        for (let i = 0; i < txt.length; i++) this.createChar(txt[i])
    }

    createChar(_glyph) {
        const char = new Char(_glyph.name, {
            fontSize: this.fontSize,
            commands: _glyph.path.commands,
            width: _glyph.advanceWidth,
            height: _glyph.advanceHeight,
            scale: this.scale,
            bbox: _glyph.bbox,
            lineHeight: .75,
            metrics: _glyph._metrics
        })
        this.chars.push(char)
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.clear()
        this.context.strokeStyle = "#FF0"
        this.context.fillStyle = "#F0F"
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