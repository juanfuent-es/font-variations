import { loadFont } from '../utils/fontloader'
/**
 * Class representing a variable font
 * @extends EventTarget
 * @example const font = new VariableFont('fonts/Roboto-VF.ttf')
 */
export default class VariableFont extends EventTarget {
    constructor(_source) {
        super();
        if (!_source) throw new Error("VFont: No source provided");
        this.src = _source; // URL of the font
        this.axes = {}; // Font variation axes
        this.loadFont(); // Load the font
    }

    // Method to asynchronously load the font
    async loadFont() {
        try {
            const font = await loadFont(this.src)
            this.font = font;
            this.axes = font.variationAxes; // Get and store the font variation axes
            this.dispatchEvent(new Event('fontloaded')); // Dispatch an event indicating the font has been loaded
        } catch (error) {
            console.error("Error loading font:", error); // Handle errors in loading the font
        }
    }

    // Method to get a glyph variation based on the variation axes
    glyphVariation(char, args = {}) {
        const wght = args.wght || this.defaultAxe('wght'); // Get the weight (wght) of the variation
        const wdth = args.wdth || this.defaultAxe('wdth'); // Get the width (wdth) of the variation
        return this.#getGlyphVariation(char, wght, wdth);
    }

    // Method to get a text variation based on the variation axes
    textVariation(txt, args = {}) {
        const wght = args.wght || this.defaultAxe('wght'); // Get the weight (wght) of the variation
        const wdth = args.wdth || this.defaultAxe('wdth'); // Get the width (wdth) of the variation
        return this.#getTextVariation(txt, wght, wdth);
    }

    // Method to get a default value within the range of a variation axis
    defaultAxe(_axe) {
        return this.axes[_axe].default; // Return the default value of the variation axis
    }

    // Private method to get a glyph variation
    #getGlyphVariation(char, wght, wdth) {
        const variation = this.font.getVariation({ wght, wdth }); // Get the font variation
        const run = variation.layout(char); // Layout the character with the variation
        return run.glyphs[0]; // Return the first glyph of the layout
    }

    // Private method to get a text variation
    #getTextVariation(txt, wght, wdth) {
        const variation = this.font.getVariation({ wght, wdth }); // Get the font variation
        const run = variation.layout(txt); // Layout the text with the variation
        return run.glyphs; // Return the glyphs of the layout
    }
}