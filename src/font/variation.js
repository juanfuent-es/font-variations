import VFont from './vfont'
import Glyph from './glyph'

export default class Variation {
    constructor(params) {
        this.txt = params.txt
        this.glyphs = []
        this.fontSize = 300
        this.font = new VFont(params.font)
        this.font.addEventListener('fontloaded', () => this.setup())
    }

    setup() {
        const glyph = this.font.glyphVariation("A", {
            wght: 400,
            wdth: 100
        })
        this.createChar(glyph)
        // Example for text with the same variation. Default variation
        const txt = this.font.textVariation(this.txt)
        for (let i = 0; i < txt.length; i++) this.createChar(txt[i])
    }

    createChar(_glyph) {
        const glyph = new Glyph(_glyph.name, {
            fontSize: this.fontSize,
            commands: _glyph.path.commands,
            width: _glyph.advanceWidth,
            height: _glyph.advanceHeight,
            bbox: _glyph.bbox,
            lineHeight: .75,
            metrics: _glyph._metrics
        })
        this.glyphs.push(glyph)
    }

    draw(_ctx) {
        let offset_x = 0
        for (let i = 0; i < this.glyphs.length; i++) {
            const glyph = this.glyphs[i]
            glyph.draw(_ctx, {
                offset_x: offset_x
            })
            offset_x += glyph.width
        }
    }

}