var turn=0;
var pieces = 0;
var playing = true;

function reset(){
  turn=0;
  pieces = 0;
  playing = true;
  document.getElementsByTagName('h1')[0].innerText="Connect 4:"
  var i;
  for (i=0;i<6;i++){
    var j;
    for (j=0;j<7;j++){
      //console.log(i,j);
      document.getElementById('board').childNodes[i].childNodes[j].style.backgroundColor='';
      document.getElementById('board').childNodes[i].childNodes[j].style.opacity=1;
      }
    }
  }

function victory(winner){
  var msg = winner +" player wins!";
  document.getElementsByTagName('h1')[0].innerText=msg;
  document.body.style.backgroundColor = winner;
  if (playing){
    document.getElementById(winner).innerText = (1 + parseInt(document.getElementById(winner).innerText,10));
  }
}

function lowestEmptySpot(col){
  var i;
  for (i =5;i>=0;i--) {
    //console.log(document.getElementById('board').childNodes[i].childNodes[col]);
			if (document.getElementById('board').childNodes[i].childNodes[col].style.backgroundColor=='') {
				return i;
			}
		}
		return -1;
}

function addPiece(col, color){
  if (lowestEmptySpot(col)>=0 && playing){
    document.getElementById('board').childNodes[lowestEmptySpot(col)].childNodes[col].style.backgroundColor=color;
    turn = 1-turn;
    pieces++;
    checkForWinner();
  }
  else if (playing==false){
    alert("The game's over, man. Move on.")
  }
  else {
    alert("INVALID MOVE!");
  }
}

function indexOfChild(child){
  var i = 0;
  while( (child = child.previousSibling) != null )
  i++;
  return i
}

function checkLine(i1,i2,j1,j2,x,y){
  var i;
  for (i=i1;i<i2;i++){
    var j;
    for (j=j1;j<j2;j++){
      if(document.getElementById('board').childNodes[i].childNodes[j].style.backgroundColor!=''){
        if(document.getElementById('board').childNodes[i].childNodes[j].style.backgroundColor==document.getElementById('board').childNodes[i+(1*x)].childNodes[j+(1*y)].style.backgroundColor &&
           document.getElementById('board').childNodes[i].childNodes[j].style.backgroundColor==document.getElementById('board').childNodes[i+(2*x)].childNodes[j+(2*y)].style.backgroundColor &&
           document.getElementById('board').childNodes[i].childNodes[j].style.backgroundColor==document.getElementById('board').childNodes[i+(3*x)].childNodes[j+(3*y)].style.backgroundColor){
             victory(document.getElementById('board').childNodes[i].childNodes[j].style.backgroundColor);
            document.getElementById('board').childNodes[i].childNodes[j].style.opacity = .5;
            document.getElementById('board').childNodes[i+(1*x)].childNodes[j+(1*y)].style.opacity = .5;
            document.getElementById('board').childNodes[i+(2*x)].childNodes[j+(2*y)].style.opacity = .5;
            document.getElementById('board').childNodes[i+(3*x)].childNodes[j+(3*y)].style.opacity = .5;
            playing = false;
        }
      }
    }
  }
}
function checkForWinner(){
    if (pieces==42) {
      //console.log('YYY');
			document.getElementsByTagName('h1')[0].innerText="TIE!";
		}
    else{
      checkLine(0,6,0,4,0,1);
      checkLine(0,3,0,7,1,0);
      checkLine(3,6,3,7,-1,-1);
      checkLine(3,6,0,4,-1,1);
    }
}


var i;
for (i=0;i<6;i++){
  var j;
  for (j=0;j<7;j++){
    //console.log(i,j);
    document.getElementById('board').childNodes[i].childNodes[j].onclick = function(j){
      //console.log(indexOfChild(this));
      //console.log(pieces);
      if (turn==0){addPiece(indexOfChild(this),'blue')}
      else if (turn==1){addPiece(indexOfChild(this),'yellow')}
    }
  }
}

document.getElementById('btn').onclick = reset;
