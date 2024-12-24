/*
    * Author: JuanFuent.es
    * @param {String} glyphName - Glyph name
    * @param {Object} font - Variable font object
    * @example const morph = new GlyphMorph('A', font)
*/
import Glyph from './glyph'

export default class GlyphMorph {
    constructor(glyphName, font) {
        this.glyphName = glyphName
        this.font = font
        this.axes = this.font.axes
        this.fontSize = 100
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
            fontSize: this.fontSize,
            commands: glyph.path.commands,
            width: glyph.advanceWidth,
            height: glyph.advanceHeight,
            lineHeight: .75
        })
    }

    createSVG() {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', this.maxGlyph.width);
        svg.setAttribute('height', this.maxGlyph.lineHeight);
        svg.setAttribute('viewBox', `0 0 ${this.maxGlyph.width} ${this.maxGlyph.lineHeight}`);
        return svg
    }
    
    createSVGPath(_svgPathData, _fill = "#FFF") {
        const svgNS = 'http://www.w3.org/2000/svg';
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', _svgPathData);
        path.setAttribute('fill', _fill);
        path.setAttribute('transform', `translate(0, ${this.maxGlyph.lineHeight})`)
        return path
    }

}