let canvas=new fabric.Canvas('canvasElement',{
    width: window.innerWidth,
    height: window.innerHeight
});

let addingLineBtn=document.getElementById('adding-line-btn');
let addingLineBtnClicked = false;
let SelectedPalleteColor = 'red';
let palleteColor = document.getElementsByTagName ('input')[0].onchange=function(){
    SelectedPalleteColor =this.value;
}
let textarea=null;     
addingLineBtn.addEventListener('click', activateAddingLine);

function activateAddingLine(){
    if(addingLineBtnClicked===false){
        addingLineBtnClicked=true; 
        canvas.on('mouse:down', startAddingLine);
        canvas.on('mouse:move', startDrawingLine);
        canvas.on('mouse:up', stopDrawingLine);

        canvas.selection=false;
        canvas.hoverCursor = 'auto';
        objectSelectabilty('added-line', false);

    }    

}
let line;
let mouseDown=false;
function startAddingLine(o){
    mouseDown=true;
    let pointer=canvas.getPointer(o.e);
    line=new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y],{
        id:'added-line',
        stroke: SelectedPalleteColor,
        strokewidth:3,
        selectable: false
    });
    canvas.add(line);
    canvas.requestRenderAll();
}
function startDrawingLine(o){
    if(mouseDown===true){
        let pointer=canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y
        });

        canvas.requestRenderAll();
    }
}

function stopDrawingLine(o){
    line.setCoords();
    mouseDown=false
}

let deactivateAddingShapeBtn=document.getElementById('deactivate-adding-shape-btn');

deactivateAddingShapeBtn.addEventListener ('click', deactivateAddingShape);

function deactivateAddingShape(){
     addingLineBtnClicked=false; 
    console.log("Deactivate key pressed");
     canvas.off('mouse:down', startAddingLine);
     canvas.off('mouse:move', startDrawingLine);
     canvas.off('mouse:up', stopDrawingLine);
     objectSelectabilty('added-line', true);
    //  canvas.getObjects().forEach(o => {
    //      if(o.id==='added-line'){
    //          o.set({
    //              selectable:true
    //          });
    //      }
    //  });
     canvas.hoverCursor = 'all-scroll';
}

function objectSelectabilty(id,value){
    canvas.getObjects().forEach(o => {
        if(o.id===id){
            o.set({
                selectable:value
            });
        }
    });
}

canvas.on('mouse:dblclick', addingControlPoints);
function addingControlPoints(o){
    let obj=o.target;

    if(!obj){
        return;
    }
    else{
        if(obj.id==='added-line'){
            let pointer1=new fabric.Circle({
                radius: obj.strokeWidth*5,
                stroke: 'black',
                strokeWidth: obj.strokeWidth*2,
                fill: 'grey',
                opacity: 0.9,
                top: obj.y1,
                left: obj.x1,
                originX: 'center',
                originY: 'center'
            });
        
            let pointer2=new fabric.Circle({
                radius: obj.strokeWidth*5,
                stroke: 'black',
                strokeWidth: obj.strokeWidth*2,
                fill: 'grey',
                opacity: 0.9,
                top: obj.y2,
                left: obj.x2,
                originX: 'center',
                originY: 'center'
            });
        
            canvas.add(pointer1, pointer2);
            canvas.requestRenderAll();
        }                   I
    }   
}

let addTextLabelBtn=document.getElementById('add-Text-Label-Btn');
addTextLabelBtn.addEventListener('click', showLabelInput);

document.getElementById("AddLabel").style.display = "none";
inputShow=false;
function showLabelInput(){
    if(inputShow===false){
        document.getElementById("AddLabel").style.display = "block";
        inputShow=true;
    }
    else if(inputShow===true){
        document.getElementById("AddLabel").style.display = "none";
        inputShow=false;
    }
    

}

const elem = document.getElementById("AddLabel");

elem.addEventListener("keypress", (event)=> {
    if (event.key === 'Enter') { // key code of the keybord key
      event.preventDefault();
      console.log("Shiraj");
      var MyLabel = new fabric.Text(document.getElementById("AddLabel").value, {
        top: 0,
        left: 0,
        originX: 'left',
        textAlign:'left',
		fill: 'black'
	});
    canvas.add(MyLabel);
	canvas.centerObject(MyLabel);
    document.getElementById("AddLabel").value = "";
    document.getElementById("AddLabel").style.display = "none";
    }
  });
