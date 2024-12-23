import fontkit from 'https://cdn.jsdelivr.net/npm/fontkit@2.0.2/+esm'
// const fontkit = require('fontkit')

import Canvas from "../lib/canvas"
import {
    Buffer
} from 'buffer'
import Char from "../fonts/char"

/*
 * REFERENCES
 * https://freetype.org/freetype2/docs/glyphs/
 * https://learn.microsoft.com/es-es/typography/opentype/spec/featuretags
 */
export default class VFont extends Canvas {
    constructor(_container) {
        super()
        // this.container = document.querySelector(_container)
        this.container = document.body
        this.container.appendChild(this.canvas)
        //
        this.txt = "y"
        // this.txt = this.container.dataset.text
        this.chars = []
        this.font = null
        // Variable Font -->
        // this.fontUrl = '/static/Hubot-Sans.ttf'
        this.fontUrl = '/static/Fraunces-Italic.ttf'
        this.fontSize = 300
        this.variable = {
            wght: 900, //100-900
            // "opsz" 120, 
            soft: 100 // 0-100
            // wght: 200, //200-900
            // wdth: 75 //75-150
        }
        this.scale = 1 / 1024 * this.fontSize // 1024 default set value, see: https://github.com/foliojs/fontkit/blob/13bf703d6c01acbb3d36437ba90c119501186512/test/metadata.js
        this.loadFont(this.fontUrl)
    }

    loadFont(_url) {
        fetch(_url).then(res => res.arrayBuffer()).then(fontBlob => {
            this.font = fontkit.create(new Buffer.from(fontBlob))
            this.variation = this.font.getVariation({
                "wght": this.variable.wght,
                "soft": this.variable.soft,
                // "wdth": this.variable.wdth
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

    render() {
        this.clear()
        this.context.fillStyle = "#FF0"
        this.context.save()
        for (let i = 0; i < this.chars.length; i++) {
            this.context.save()
            const char = this.chars[i]
            // this.context.fill(char.path)
            this.context.fill(char.path)
            // this.drawBbox(this.context, char.bbox)
            this.context.restore()
        }
        this.context.restore()
    }

    drawBbox(ctx, bbox) {
        ctx.setLineDash([5,15])
        ctx.strokeRect(bbox.minX, bbox.minY, bbox.maxX, bbox.maxY)
    }
    
}