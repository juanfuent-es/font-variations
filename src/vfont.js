import { loadFont } from './fontloader'

/*
 * REFERENCES
 * https://github.com/github/hubot-sans
 * https://freetype.org/freetype2/docs/glyphs/
 * https://learn.microsoft.com/es-es/typography/opentype/spec/featuretags
 */

export default class VFont extends EventTarget {
    constructor(_source) {
        super()
        if (!_source) throw new Error("VFont: No source provided");
        this.src = _source
        this.axes = {}
        loadFont(this.src).then(font => {
            this.font = font
            this.axes = font.variationAxes
            this.dispatchEvent(new Event('fontloaded'));
        })
    }

    glyphVariation(char, args={}) {
        const wght = args.wght ? args.wght : this.randomAxe('wght')
        const wdth = args.wdth ? args.wdth : this.randomAxe('wdth')
        const variation = this.font.getVariation({
            "wght": wght,
            "wdth": wdth
        })
        const run = variation.layout(char)
        return run.glyphs[0]
    }

    randomAxe(_axe) {
        const axe = this.axes[_axe]
        const value = ~~(Math.random() * (axe.max - axe.min)) + axe.min
        return value
    }

}