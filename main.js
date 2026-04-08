let root = null;
let Tree = document.querySelector('.Tree')
let svg


// Display
let input = document.getElementById("input");
let inorder = document.getElementById("Inorder");
let preorder = document.getElementById("Preorder");
let postorder = document.getElementById("Postorder");
function CreateNode(value,x,y){
    let node = document.createElement("h3");
    node.className = "Node";
    node.innerHTML = value;
    node.style.left = x+"px";
    node.style.top = y+"px";

    Tree.append(node)
    return node
}

function Createsvg(){
    Tree.innerHTML = "";
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    Tree.append(svg)
}

function update(){
    if (root == null){ return }
    inorder.innerHTML = "Inorder: "+root.Inorder().join(", ")
    preorder.innerHTML = "Preorder: "+root.Preorder().join(", ")
    postorder.innerHTML = "Postorder: "+root.Postorder().join(", ")
    Createsvg()
    root.Draw(0,0)
}

function add(value){
    let display = value;

    if (isNaN(value)){
        value = 0;
        for (let i = 0; i < display.length; i++) {
            value += display.charCodeAt(i)
        }
    } else{
        value = Number(value)
    }
    if (!root){
        Createsvg()
        root = new node(value,display);
    } else{
        root.add(value,display)
    }
    update()
}
function search(value){
    if (root === null){
       return []
    } else{
       return root.search(value)
    }
}
function Delete(value){
    let nodes = search(value)    
    let node = nodes[nodes.length-1];
    let children = node.getchildren();
    if (nodes.length <= 1){
         root = null; 
    }
    else {
        let prev = nodes[nodes.length-2];

        if (prev.getleft() == node){
            prev.setleft(null);
        } else{
            prev.setright(null);
        }
    }

    children.forEach(data => {
        add(data.getvalue(),data.getdisplay());
    });
    update()
} 



// Displaying
let IIB = document.getElementById("II");
let nval = document.getElementById("new");
IIB.addEventListener('click', function() {add(nval.value)});

let IDB = document.getElementById("ID");
let Dval = document.getElementById("delete");
IDB.addEventListener('click',function(){Delete(Dval.value)});