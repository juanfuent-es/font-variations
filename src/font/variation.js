/*
* Variation
* @author: JuanFuent.es
* @version: 0.0.1
* @description Create a text variation from a variable font
* @example
* const variation = new Variation({
*     font: 'fonts/Roboto-VF.ttf',
*     txt: 'Hello',
*     wght: 400,
*     wdth: 100
* })
* Load a variable font and create a text variation
* @param {Object} params
* @param {String} params.font - Font path
* @param {String} params.txt - Text to display
* @param {Number} params.wght - Weight
* @param {Number} params.wdth - Width
*/
import VariableFont from './variable_font'
import Glyph from './glyph'
export default class Variation {
    constructor(params) {
        if (!params.font) throw new Error('Font is required')
        this.txt = params.txt || "Hello"
        this.glyphs = []
        this.fontSize = 300
        this.wght = params.wght || 400
        this.wdth = params.wdth || 100
        // Load font
        this.font = new VariableFont(params.font)
        this.font.addEventListener('fontloaded', () => this.setup())
    }

    setup() {
        const txt = this.font.textVariation(this.txt, this.variation)
        for (let i = 0; i < txt.length; i++) this.createGlyph(txt[i])
    }

    createGlyph(_glyph) {
        const glyph = new Glyph(_glyph.name, {
            fontSize: this.fontSize,
            commands: _glyph.path.commands,
            width: _glyph.advanceWidth,
            height: _glyph.advanceHeight,
            lineHeight: .75
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

    get variation() {
        return {
            wght: this.wght,
            wdth: this.wdth
        }
    }

}