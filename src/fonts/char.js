export default class Char {
    constructor(char, args = {}) {
        if (char === undefined) console.error("Char is required")
        this.char = char || ""
        //
        this.fontSize = args.fontSize || 28
        this.lineHeight = this.fontSize * (args.lineHeight || .75)
        this.scale = args.scale || 1
        this.width = ~~(args.width * this.scale)
        this.height = ~~(args.height * this.scale)
        this.bbox = {}
        this.metrics = {}
        this.path = new Path2D()
        this.setupBoundingBox(args.bbox)
        this.setupCommands(args.commands)
        this.setupMetrics(args.metrics)
    }

    setupMetrics(_metrics) {
        this.metrics.advanceHeight = _metrics.advanceHeight * this.scale
        this.metrics.advanceWidth = _metrics.advanceWidth * this.scale
        this.metrics.leftBearing = _metrics.leftBearing * this.scale
        this.metrics.topBearing = _metrics.topBearing * this.scale
    }
    
    setupBoundingBox(_bbox) {
        this.bbox.minX = _bbox.minX * this.scale
        this.bbox.minY = _bbox.minY * -this.scale
        this.bbox.maxX = _bbox.maxX * this.scale
        this.bbox.maxY = _bbox.maxY * -this.scale
    }

    /*  
     * For more information about glpyh properties
     * @see: https://freetype.org/freetype2/docs/glyphs/glyphs-3.html
     */
    setupCommands(_commands) {
        const commands = _commands.map((command) => {
            return this.commandFormatter(command)
        })
        this.path = this.commandsToPath(commands)
    }

    commandFormatter(_command) {
        return {
            command: _command.command,
            args: _command.args.map((pos, i) => {
                const axisScale = i % 2 ? -this.scale : this.scale // Flip axis y
                const lineheight = i % 2 ? (this.fontSize * this.lineHeight) : 0 // calculate lineheight
                const offset = i % 2 ? this.height : this.width // center
                let _pos = pos * axisScale // Adjust value with correct size, applying scale
                // _pos += lineheight
                // _pos -= (offset * .5)
                return _pos
            })
        }
    }

    commandsToPath(_commands) {
        const _path = new Path2D()
        _commands.forEach(c => {
            return _path[c.command].apply(_path, c.args)
        })
        return _path
    }

    draw(_ctx, args = {}) {
        _ctx.save()
        _ctx.translate(0, this.lineHeight)
        if (args.offset_x) _ctx.translate(args.offset_x, 0)
        _ctx.fill(this.path)
        // this.drawBbox(_ctx)
        _ctx.restore()
    }

    // Método para dibujar el cuadro delimitador de un carácter
    drawBbox(ctx) {
        ctx.setLineDash([5,15])
        ctx.strokeRect(this.bbox.minX, this.bbox.minY, this.bbox.maxX, this.bbox.maxY)
    }

}