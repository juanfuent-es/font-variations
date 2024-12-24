export default class Char {
    constructor(char, args = {}) {
        if (char === undefined) console.error("Char is required")
        this.char = char || ""
        //
        this.fontSize = args.fontSize || 28
        this.lineHeight = this.fontSize * (args.lineHeight || .75)
        this.scale = 1 / 1024 * this.fontSize // 1024 default set value, see: https://github.com/foliojs/fontkit/blob/13bf703d6c01acbb3d36437ba90c119501186512/test/metadata.js        
        this.width = ~~(args.width * this.scale)
        this.height = ~~(args.height * this.scale)
        this.path = new Path2D()
        this.setupCommands(args.commands)
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
                return pos * axisScale // Adjust value with correct size, applying scale
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
        _ctx.restore()
    }

}