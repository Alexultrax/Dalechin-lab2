var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas=[];
var count=0;
var timer;

canvas.onclick = function(event)
{
    var form = document.forms[0];
    var select = form.elements.config;
    var brush;

    for (var i = 0; i < select.options.length; i++) {
    var option = select.options[i];
    if(option.selected) {
        brush = option.value;
        }
    }

if(brush == 'hive')
{var json = {"cells":[{"x":1,"y":0},{"x":2,"y":0},{"x":0,"y":1},{"x":3,"y":1},{"x":1,"y":2},{"x":2,"y":2}]};}
if(brush == 'glider')
{var json = {"cells":[{"x":1,"y":0},{"x":2,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":2,"y":2}]};}
if(brush == 'point')
{var json = {"cells":[{"x":0,"y":0}]};}

	var x = event.offsetX;
	var y = event.offsetY;
	console.log(x);
	console.log(y);
	x = Math.floor(x/10);
	y = Math.floor(y/10);
    for (var i = 0; i < json.cells.length; i++){
        mas[y + json.cells[i].y][x + json.cells[i].x] =
        (mas[y + json.cells[i].y][x + json.cells[i].x] == 0 ? 1 : 0);
    }
	console.log(mas);
	drawField();
}
function goLife(){
	var n=30, m=30;
	for (var i=0; i<m; i++){
		mas[i]=[];
		for (var j=0; j<n; j++){
			mas[i][j]=0;
		}
	}
}
goLife();

function drawField(){
	ctx.clearRect(0, 0, 300, 300);
	for (var i=0; i<30; i++){
		for (var j=0; j<30; j++){
			if (mas[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}

function startLife(){
	//моделирование жизни
	var mas2 = [];
	var f = 0;
	for (var i=0; i<30; i++){
		mas2[i]=[];
		for (var j=0; j<30; j++){
			var neighbors = 0;
			if (mas[fpm(i)-1][j]==1) neighbors++;//up
			if (mas[i][fpp(j)+1]==1) neighbors++;//right
			if (mas[fpp(i)+1][j]==1) neighbors++;//bottom
			if (mas[i][fpm(j)-1]==1) neighbors++;//left
			if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++;
			if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;
			if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;
			if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;
			mas2[i][j] = (mas[i][j] == 0 && neighbors==3) || ((mas[i][j] == 1) && (neighbors==2 || neighbors==3)) ? 1 : 0;
             if (mas[i][j] != mas2[i][j]) f = 1;
 		}
 	}
 	if (f == 1)
         {
	mas = mas2;
	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, document.getElementById('speed').value*100);
}
}
function stop()
{
    goLife();
    drawField();
}

function fpm(i){
	if(i==0) return 30;
	else return i;
}
function fpp(i){
	if(i==29) return -1;
	else return i;
}

document.getElementById('start').onclick = startLife;
