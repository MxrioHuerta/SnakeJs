//Variables globales
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
var snake = new Snake(50, 50)
let arrFood = []

function nodoHit(nodoUno, nodoDos) {
    return nodoUno.x == nodoDos.x && nodoUno.y == nodoDos.y;
}


//Listeners y Timers
; (function () {

    //listeners
    window.addEventListener("keydown", function () {
        if (event.keyCode === 38) snake.up()
        if (event.keyCode === 39) snake.right()
        if (event.keyCode === 40) snake.down()
        if (event.keyCode === 37) snake.left()

    })


    const animation = setInterval(function () {
        snake.move()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        snake.draw()
        drawFood()
        //Verificador de Muerte
        if (snake.dead()) {
            window.clearInterval(animation)
        }
    }, 1000 / 20)

    setInterval(function () {
        const f = Food.createFood()
        arrFood.push(f)
        setTimeout(function () {
            removeFood(f)
        }, 8000)
    }, 1500)


    function drawFood() {
        arrFood.forEach((f) => {
            f.draw()
            if (hit(snake.head, f)) {
                snake.eat();
                removeFood(f)
            }
        })
    }

    function removeFood(food) {
        arrFood = arrFood.filter((f) => {
            return f !== food
        })
    }



    //colisionador de dos elementos
    function hit(a, b) {
        var hit = false
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
        }
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
        }
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
        }
        return hit
    }

})()

