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
        this.txt = "WEB CRAFT"
        // this.txt = this.container.dataset.text
        this.chars = []
        this.font = null
        // Variable Font -->
        this.fontUrl = '/HubotSans.ttf'
        this.fontSize = 200
        // variation settings
        this.wght = {
            value: 200,
            min: 200,
            max: 900
        } //200-900
        this.wdth = {
            value: 125,
            min: 75,
            max: 150
        }, //75-150
        this.scale = 1 / 1024 * this.fontSize // 1024 default set value, see: https://github.com/foliojs/fontkit/blob/13bf703d6c01acbb3d36437ba90c119501186512/test/metadata.js
        this.loadFont(this.fontUrl)
        this.animate()

        window.addEventListener('resize', () => this.setSize())
        this.setSize()
    }

    loadFont(_url) {
        fetch(_url).then(res => res.arrayBuffer()).then(fontBlob => {
            const font = fontkit.create(new Buffer.from(fontBlob))
            this.setChars(font) //Set chars with variation
        })
    }

    setChars(_font) {
        for (let i = 0; i < this.txt.length; i++) {
            const char = this.txt[i]
            const wdth = ~~(Math.random() * this.wdth.max) + this.wdth.min
            const wght = ~~(Math.random() * this.wght.max) + this.wght.min
            const variation = _font.getVariation({
                "wght": wght,
                "wdth": wdth
            })
            const run = variation.layout(char)
            const glyphs = run.glyphs
            this.createCharFromGlyph(glyphs[0])
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
        _ctx.save()
        _ctx.translate(0, this.fontSize * .75)
        let offset_x = 0
        for (let i = 0; i < this.chars.length; i++) {
            const char = this.chars[i]
            char.draw(_ctx, {
                offset_x: offset_x
            })
            offset_x += char.width
        }
        _ctx.restore()
    }
    
}

const vfont = new VFont()