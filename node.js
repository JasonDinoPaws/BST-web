class node{
    #value;
    #left = null;
    #right = null;
    #display;
    #visual;

    constructor(value,display){
        this.#value = value;
        this.#display = display;
    }

    getleft(){ return this.#left; }
    getright(){ return this.#right; }
    getvalue(){ return this.#value; }
    getdisplay(){ return this.#display; }
    getvisual(){ return this.#visual; }

    setleft(node){ this.#left = node; }
    setright(node){ this.#right = node; }

    add(value,display){
         if(value <= this.#value){
            if (!this.#left){
                this.#left = new node(value,display)
            } else{
                this.#left.add(value,display)
            }
        }else if(value > this.#value){
            if (!this.#right){
                this.#right = new node(value,display)
            } else{
                this.#right.add(value,display)
            }
        }
    }

    Draw(x,y,n){
        let lx = x;
        let rx = x;
        if (this.#left){
            lx = this.#left.Draw(x,y+60,n+1)
            svg.innerHTML += `<line class="line" x1="${lx+25}" y1="${y+25}" x2="${x+25}" y2="${y+75}" />`
        }

        this.#visual = CreateNode(this.#display,lx,y)
        let xo = this.#visual.offsetLeft;
        let xw = this.#visual.offsetWidth;
        rx = xw+xo-5;

        if (this.#right){
            rx = this.#right.Draw(rx,y+60,n+1)
            svg.innerHTML += `<line class="line" x1="${lx+25}" y1="${y+25}" x2="${rx-25}" y2="${y+75}" />`
        }
        return rx
    }

    search(value,path=[]){
        if (value == this.#value){
            path.push(this)
        }else if(value < this.#value){
            path.push(this)
            return this.#left.search(value,path)
        }else {
            path.push(this)
            return this.#right.search(value,path)
        }
        return path
    }

    getnodes(path=[]){
        path.push(this)
        if (this.#left){
            this.#left.getnodes(path)
        }
        if (this.#right){
            this.#right.getnodes(path)
        }
        return path
    }

    getchildren(){
        let path = [];
        if (this.#left){
            path = path.concat(this.#left.getnodes())
        }
        if (this.#right){
            path = path.concat(this.#right.getnodes())
        }
        return path
    }

    getdepth(){
        let ld = 0;
        let rd = 0
        let val;
        if (this.#left){
            val = this.#left.getdepth()
            ld = Math.max(val[0],val[1])+1
        }
         if (this.#right){
            val = this.#right.getdepth()
            rd = Math.max(val[0],val[1])+1
        }

        return [ld, rd];
    }

    balance(){
        let depth = this.getdepth()
        Rotate(this,depth[0]-depth[1])
        if (this.#left){
            this.#left.balance()
        }
        if (this.#right){
            this.#right.balance()
        }
    }

    Inorder(path=[]){
        if (this.#left){
            this.#left.Inorder(path)
        }
        path.push(this.#display)
        if (this.#right){
            this.#right.Inorder(path)
        }
        return path
    }

    Preorder(path=[]){
        path.push(this.#display)
        if (this.#left){
            this.#left.Preorder(path)
        }
        if (this.#right){
            this.#right.Preorder(path)
        }
        return path
    }

    Postorder(path=[]){
        if (this.#left){
            this.#left.Postorder(path)
        }
        if (this.#right){
            this.#right.Postorder(path)
        }
        path.push(this.#display)
        return path
    }
}