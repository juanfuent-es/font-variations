async function fontAsDataURL(_url) {
    return fetch(_url)
        .then((resp) => resp.ok && resp.blob())
        .then((blob) => new Promise((res) => {
            const reader = new FileReader()
            reader.onload = (evt) => res(reader.result)
            reader.readAsDataURL(blob)
        }))
}

const HUBOT = await fontAsDataURL("/Hubot-Sans.ttf")

export {
    HUBOT
}