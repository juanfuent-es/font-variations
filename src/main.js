import './style.css'
import * as fontkit from 'fontkit';
import Canvas from "./canvas.js"
import {
    Buffer
} from 'buffer'
import Char from "./fonts/char"

/*
 * REFERENCES
 * https://github.com/github/hubot-sans
 * https://freetype.org/freetype2/docs/glyphs/
 * https://learn.microsoft.com/es-es/typography/opentype/spec/featuretags
 */
class VFont extends Canvas {
    constructor(_container) {
        super()
        this.container = document.querySelector("main")
        this.container.appendChild(this.canvas)
        //
        this.txt = "K"
        // this.txt = this.container.dataset.text
        this.chars = []
        this.font = null
        // Variable Font -->
        this.fontUrl = '/HubotSans.ttf'
        this.fontSize = 300
        this.variation = {
            wght: 900, //200-900
            wdth: 125 //75-150
        }
        this.scale = 1 / 1024 * this.fontSize // 1024 default set value, see: https://github.com/foliojs/fontkit/blob/13bf703d6c01acbb3d36437ba90c119501186512/test/metadata.js
        this.loadFont(this.fontUrl)
        this.animate()

        window.addEventListener('resize', () => this.setSize())
        this.setSize()
    }

    loadFont(_url) {
        fetch(_url).then(res => res.arrayBuffer()).then(fontBlob => {
            this.font = fontkit.create(new Buffer.from(fontBlob))
            this.variation = this.font.getVariation({
                "wght": this.variation.wght,
                "wdth": this.variation.wdth
            })
            this.setChars(this.variation) //Set chars with variation
        })
    }

    setChars(_font) {
        const run = _font.layout(this.txt) // Get glyphs of the chars in text
        const glyphs = run.glyphs

        for (let i = 0; i < glyphs.length; i++) {
            const _glyph = glyphs[i]
            const char = new Char(_glyph.name, {
                fontSize: this.fontSize,
                commands: _glyph.path.commands,
                width: _glyph.advanceWidth,
                height: _glyph.advanceHeight,
                scale: this.scale,
                bbox: _glyph.bbox,
                metrics: _glyph._metrics
            })
            this.chars.push(char)
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.clear()
        this.context.strokeStyle = "#FF0"
        this.context.fillStyle = "#FF0"
        this.context.save()
        this.context.translate(0,this.fontSize * .75)
        for (let i = 0; i < this.chars.length; i++) {
            this.chars[i].draw(this.context)
        }
        this.context.restore()
    }
    
}

const vfont = new VFont()