export default class Glyph {
    constructor(char, args = {}) {
        this.char = char || ""
        //
        this.fontSize = args.fontSize || 28
        this.lineHeight = this.fontSize * (args.lineHeight || .75)
        this.scale = 1 / 1024 * this.fontSize // 1024 default set value, see: https://github.com/foliojs/fontkit/blob/13bf703d6c01acbb3d36437ba90c119501186512/test/metadata.js        
        this.width = ~~(args.width * this.scale)
        this.height = ~~(args.height * this.scale)
        this.path = new Path2D()
        this.commands = args.commands || []
        this.setupCommands()
    }
    /*  
     * For more information about glpyh properties
     * @see: https://freetype.org/freetype2/docs/glyphs/glyphs-3.html
     */
    setupCommands() {
        const commands = this.commands.map((command) => {
            return this.commandFormatter(command)
        })
        this.path = this.commandsToPath(commands)
        this.svgPathData = this.commandsToSVG(commands)
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
    // Convert Path2D commands to SVG path data
    commandsToSVG(_commands) {
        return _commands.map(cmd => {
            switch (cmd.command) {
                case 'moveTo': return `M${cmd.args.join(' ')}`;
                case 'lineTo': return `L${cmd.args.join(' ')}`;
                case 'bezierCurveTo': return `C${cmd.args.join(' ')}`;
                case 'quadraticCurveTo': return `Q${cmd.args.join(' ')}`;
                case 'closePath': return 'Z';
                default: return '';
            }
        }).join(' ');
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
    // Draw the glyph as an SVG path and append it to the body
    appendSVG(fillColor = '#FFF') {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', this.width);
        svg.setAttribute('height', this.lineHeight);
        svg.setAttribute('viewBox', `0 0 ${this.width} ${this.lineHeight}`);

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', this.svgPathData);
        path.setAttribute('fill', fillColor);
        path.setAttribute('transform', `translate(0, ${this.lineHeight})`);
        svg.appendChild(path);

        document.body.appendChild(svg);
    }

}