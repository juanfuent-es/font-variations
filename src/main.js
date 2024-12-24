import './style.css'
import Variation from './font/variation'
import Canvas from "./components/canvas"

class App extends Canvas {
    constructor(_container) {
        super()
        this.container = document.querySelector("main")
        this.container.appendChild(this.canvas)

        this.variation = new Variation({
            font: '/HubotSans.ttf',
            txt: 'Hello'
        })

        this.events()
    }

    events() {
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
        this.animate()
    }

    onResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.clear()
        this.variation.draw(this.context)
    }
    
}

const vfont = new App()