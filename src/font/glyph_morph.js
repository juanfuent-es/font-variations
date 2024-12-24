gsap.registerPlugin(MorphSVGPlugin)

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

    animate() {
        // Requires GSAP license to work with MorphSVGPlugin on production
        gsap.to("#start", {
            duration: 2,
            morphSVG: "#end",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
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

    appendSVG() {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', this.maxGlyph.width);
        svg.setAttribute('height', this.maxGlyph.lineHeight);
        svg.setAttribute('viewBox', `0 0 ${this.maxGlyph.width} ${this.maxGlyph.lineHeight}`);
        
        this.path_a = this.createSVGPath(this.minGlyph.svgPathData, "#FFF", "start")
        svg.appendChild(this.path_a)
        //
        this.path_b = this.createSVGPath(this.maxGlyph.svgPathData, "transparent", "end")
        svg.appendChild(this.path_b)
        //
        document.body.appendChild(svg)
    }
    
    
    createSVGPath(_svgPathData, _fill = "#FFF", _id = "start") {
        const svgNS = 'http://www.w3.org/2000/svg';
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('id', _id);
        path.setAttribute('d', _svgPathData);
        path.setAttribute('fill', _fill);
        path.setAttribute('transform', `translate(0, ${this.maxGlyph.lineHeight})`)
        return path
    }

}