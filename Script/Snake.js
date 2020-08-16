class Nodo {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.back = null
    }
    addNodo() {
        if (this.hasBack()) return this.back.addNodo()
        this.back = new Nodo(this.x, this.y)
    }
    hasBack() {
        return this.back !== null;
    }
    draw() {
        ctx.fillRect(this.x, this.y, 10, 10)
        if (this.hasBack()) {
            this.back.draw()
        }
    }

    //metodo_seguir

    follow() {
        if (this.hasBack()) {
            this.back.follow()
            this.back.x = this.x
            this.back.y = this.y
        }
    }

    right() {
        this.follow()
        this.x += 10
    }
    left() {
        this.follow()
        this.x -= 10
    }
    up() {
        this.follow()
        this.y -= 10
    }
    down() {
        this.follow()
        this.y += 10
    }

    hit(head, segundo = false) {
        if (this === head && !this.hasBack())return false;
        if (this === head) return this.back.hit(head, true); 

        if(segundo && !this.hasBack())return false;
        if(segundo) return this.back.hit(head);
        
        //No es el head, ni el segundo
        if(this.hasBack()) return nodoHit(this, head) || this.back.hit(head)

        // NO es la cabeza, ni el segundo, y soy ultimo 
        return nodoHit(this, head)

    }

}


class Snake {
    //Posicines x,y
    constructor(x, y) {
        this.head = new Nodo(x, y, 10, 10)
        this.draw()
        this.direction = ""
        this.head.addNodo()
        
    }
    draw() {
        this.head.draw();
    }
    right() {
        if (this.direction == "left") return;
        this.direction = "right"
    }
    left() {
        if (this.direction == "right") return;
        this.direction = "left"
    }
    up() {
        if (this.direction == "down") return;
        this.direction = "up"
    }
    down() {
        if (this.direction == "up") return;
        this.direction = "down"
    }

    eat() {
        this.head.addNodo()
    }

    move() {
        if (this.direction === "right") return this.head.right()
        if (this.direction === "left") return this.head.left()
        if (this.direction === "down") return this.head.down()
        if (this.direction === "up") return this.head.up()
    }

    borderLimit() {
        return this.head.x < 0 || this.head.x > 490 || this.head.y > 490 || this.head.y < 0
    }


    dead() {
        return this.head.hit(this.head) || this.borderLimit();
        
    }

}