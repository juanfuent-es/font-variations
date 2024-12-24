import { loadFont } from './fontloader'

/*
 * REFERENCES
 * https://github.com/github/hubot-sans
 * https://freetype.org/freetype2/docs/glyphs/
 * https://learn.microsoft.com/es-es/typography/opentype/spec/featuretags
 */

export default class VFont extends EventTarget {
    constructor(_source) {
        super();
        if (!_source) throw new Error("VFont: No source provided");
        this.src = _source; // URL de la fuente
        this.axes = {}; // Ejes de variación de la fuente
        this.loadFont(); // Cargar la fuente
    }

    // Método para cargar la fuente de manera asíncrona
    async loadFont() {
        try {
            const font = await loadFont(this.src); // Cargar la fuente usando la función loadFont
            this.font = font; // Almacenar la fuente cargada
            this.axes = font.variationAxes; // Obtener y almacenar los ejes de variación de la fuente
            this.dispatchEvent(new Event('fontloaded')); // Emitir un evento indicando que la fuente se ha cargado
        } catch (error) {
            console.error("Error loading font:", error); // Manejar errores en la carga de la fuente
        }
    }

    // Método para obtener una variación de un glifo basado en los ejes de variación
    glyphVariation(char, args = {}) {
        const wght = args.wght || this.defaultAxe('wght'); // Obtener el peso (wght) de la variación
        const wdth = args.wdth || this.defaultAxe('wdth'); // Obtener el ancho (wdth) de la variación
        return this.getGlyphVariation(char, wght, wdth);
    }

    // Método para obtener una variación de un texto basado en los ejes de variación
    textVariation(txt, args = {}) {
        const wght = args.wght || this.defaultAxe('wght'); // Obtener el peso (wght) de la variación
        const wdth = args.wdth || this.defaultAxe('wdth'); // Obtener el ancho (wdth) de la variación
        return this.getTextVariation(txt, wght, wdth);
    }

    // Método para obtener un valor default dentro del rango de un eje de variación
    defaultAxe(_axe) {
        return this.axes[_axe].default; // Devolver el valor default del eje de variación
    }

    // Método privado para obtener una variación de un glifo
    getGlyphVariation(char, wght, wdth) {
        const variation = this.font.getVariation({ wght, wdth }); // Obtener la variación de la fuente
        const run = variation.layout(char); // Disponer el carácter con la variación
        return run.glyphs[0]; // Devolver el primer glifo de la disposición
    }

    // Método privado para obtener una variación de un texto
    getTextVariation(txt, wght, wdth) {
        const variation = this.font.getVariation({ wght, wdth }); // Obtener la variación de la fuente
        const run = variation.layout(txt); // Disponer el texto con la variación
        return run.glyphs; // Devolver los glifos de la disposición
    }
}