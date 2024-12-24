import Glyph from './glyph'

export default class GlyphMorph {
    constructor(glyphName, font) {
        this.glyphName = glyphName
        this.font = font
        this.axes = this.font.axes
        this.minGlyph = this.createGlyph(this.getMinVariation())
        this.maxGlyph = this.createGlyph(this.getMaxVariation())
    }

    // Get the minimum variation of the glyph
    getMinVariation() {
        const variation = {};
        for (const axis in this.axes) {
            variation[axis] = this.axes[axis].min;
        }
        return variation;
    }

    // Get the maximum variation of the glyph
    getMaxVariation() {
        const variation = {};
        for (const axis in this.axes) {
            variation[axis] = this.axes[axis].max;
        }
        return variation;
    }

    // Create a glyph with the specified variation
    createGlyph(variation) {
        const glyph = this.font.glyphVariation(this.glyphName, variation);
        return new Glyph(glyph.name, {
            fontSize: 300,
            commands: glyph.path.commands,
            width: glyph.advanceWidth,
            height: glyph.advanceHeight,
            lineHeight: .75
        })
    }

    draw(_ctx) {
        this.minGlyph.draw(_ctx, {
            offset_x: 0
        })
        this.maxGlyph.draw(_ctx, {
            offset_x: this.minGlyph.width
        })
    }

}