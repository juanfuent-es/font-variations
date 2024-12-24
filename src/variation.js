import './style.css'
import FontVariation from './font/variation'
import Canvas from "./components/canvas"

class VariableText extends Canvas {
    constructor(_container) {
        super()
        this.container = document.querySelector("body")
        this.container.appendChild(this.canvas)
        //
        this.variation = new FontVariation({
            font: '/HubotSans.ttf',
            txt: 'Hello',
            wght: 900,
            wdth: 75
        })
        this.events()
    }

    events() {
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
        this.animate()
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render(this.context)
    }

    render(_ctx) {
        this.clear()
        _ctx.fillStyle = '#FFF'
        this.variation.draw(_ctx)
    }
    
}

const variation = new VariableText()