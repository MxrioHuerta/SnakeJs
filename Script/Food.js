class Random {
    static get(start, end) {
        return (Math.floor(Math.random() * end) + start)
    }
}
class Food {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.height, this.width)
    }

    static createFood() {
        return new Food(Random.get(0, canvas.width), Random.get(0, canvas.height), 10, 10)
    }
}