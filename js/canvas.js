var canvas = document.getElementById("myCanvas");
var rec=[];  // draw rectangular tag 
var ctx=[];  // background of tags
var inputCircle=[]; //draw input units
var outputCircle=[];// draw output untis
var line=[];   //link weight connections
var iUnitText=[]; //input units text
var oUnitText=[]; //output units text
var inputNumber=[];//show numbers like 0,1,2

for (var i = 0; i < 3; i++) {
rec[i] =canvas.getContext("2d");
rec[i].fillStyle="lightgreen";
rec[i].fillRect(40+i*180,40,160,40);
var text=["Input layer","weight","Output layer"]
ctx[i] = canvas.getContext("2d");
ctx[i].font = "30px Times New Roman";
ctx[i].fillStyle = "black";
ctx[i].textAlign = "center";
ctx[i].fillText(text[i], 120+i*180, 70); }//tags
//input units & text
for (var i = 0; i < 5; i++) {
	inputCircle[i]=canvas.getContext("2d");
	inputCircle[i].beginPath();
	inputCircle[i].arc(120,170+i*90,35,0,2*Math.PI);// margin 20
	inputCircle[i].stroke();
    iUnitText[i]=canvas.getContext("2d");
    iUnitText[i].font = "30px Times New Roman";
    iUnitText[i].fillStyle = "black";
    iUnitText[i].textAlign = "center";
    iUnitText[i].fillText("a", 60, 180+i*90); 
    inputNumber[i]=canvas.getContext("2d");
    inputNumber[i].font = "15px Arial";
    inputNumber[i].fillStyle = "black";
    inputNumber[i].textAlign = "center";   
    inputNumber[i].fillText(i, 70, 180+i*90); }
// output layers & threshold & output value lines
var theta=[];
var arrow=[];
var tempValue=[];
var tempEqual=[];//draw equal symbol
for(var i=0;i<2;i++){
outputCircle[i]=canvas.getContext("2d");
outputCircle[i].beginPath();
outputCircle[i].arc(480-50,260+i*180,35,0,2*Math.PI); //center left,not again in the middle of tag
outputCircle[i].stroke();
theta[i]=canvas.getContext("2d");
theta[i].font="30px Times New Roman";
theta[i].fillStyle="black";
theta[i].textAlign="center";
theta[i].fillText("θ",460-50,270+i*180);
inputNumber[i]=canvas.getContext("2d"); 
inputNumber[i].font = "15px Arial";
inputNumber[i].fillStyle = "black";
inputNumber[i].textAlign = "center";   
inputNumber[i].fillText(i+1, 470-50, 270+i*180); //use inputNumber again since 
//it is not required for storing data
ctx[i]=canvas.getContext("2d");
ctx[i].font = "30px Arial";
ctx[i].fillStyle = "black";
ctx[i].textAlign = "center";   
ctx[i].fillText("=", 485-53, 270+i*180);
// output line
line[i]=canvas.getContext("2d");
line[i].moveTo(515-50,260+i*180);  
line[i].lineTo(560,260+i*180); 
line[i].stroke();
//draw arrow of output
for (var j = 0; j < 2; j++) {
arrow[j]=canvas.getContext("2d");
arrow[j].moveTo(560,260+i*180);
arrow[j].lineTo(560-10,260+i*180-(20-10*Math.sqrt(3))+j*(40-20*Math.sqrt(3)));// 15 degree
arrow[j].stroke();	}
//draw X(output value)
oUnitText[i]=canvas.getContext("2d");
oUnitText[i].font="30px Times New Roman";
oUnitText[i].fillStyle="black";
oUnitText[i].textAlign="center";
oUnitText[i].fillText("X",460+20,250+i*180);
tempValue[i]=canvas.getContext("2d");
tempValue[i].font="15px Arial";
tempValue[i].textAlign="center";
tempValue[i].fillText(i+1,460+35,250+i*180);
tempEqual[i]=canvas.getContext("2d");
tempEqual[i].font = "30px Arial";
tempEqual[i].fillStyle = "black";
tempEqual[i].textAlign = "center";   
tempEqual[i].fillText("=", 460+50, 250+i*180);}
//weight connections
for (var i = 0; i < 5; i++) {
	for (var j = 0; j < 2; j++) {
	line[i]=canvas.getContext("2d");
	line[i].moveTo(155,170+i*90);  
	line[i].lineTo(445-50,260+j*180); 
	line[i].stroke();}}
//bias a0=1
var bias=canvas.getContext("2d");
    bias.font = "40px Times New Roman";
    bias.fillStyle = "black";
    bias.textAlign = "center";
    bias.fillText("1", 120, 185); 
//show text "iteration"
var text_right=canvas.getContext("2d");
    text_right.font = "30px Times New Roman";
    text_right.fillStyle = "black";
    text_right.textAlign = "center";
    text_right.fillText("Iteration: "+0,860, 100);  //(1087-560)/2-30*9+560 ~ 300+560
//draw a table
for (var i = 0; i < 6; i++) {
    line[i]=canvas.getContext("2d");
    line[i].moveTo(620,170+i*40);  
    line[i].lineTo(1070,170+i*40); 
    line[i].stroke();
}//six horizental lines
//five vertical lines ,every single cell equals to 50px
var verticalLine=canvas.getContext("2d");
verticalLine.moveTo(620,170);  
verticalLine.lineTo(620,370);
verticalLine.stroke();
verticalLine.moveTo(670,170);
verticalLine.lineTo(670,370);
verticalLine.stroke();
verticalLine.moveTo(870,170);
verticalLine.lineTo(870,370);
verticalLine.stroke();
verticalLine.moveTo(970,170);
verticalLine.lineTo(970,370);
verticalLine.stroke();
verticalLine.moveTo(1070,170);
verticalLine.lineTo(1070,370);
verticalLine.stroke();
//five vertical lines to divide the column into 8 parts
for (var i = 0; i < 8; i++) {
    line[i]=canvas.getContext("2d");
    line[i].moveTo(720+i*50,210);  
    line[i].lineTo(720+i*50,370); 
    line[i].stroke();
}
//show first column
var col1=[0,1,2,3];
for (var i = 0; i < 4; i++) {
ctx[i]=canvas.getContext("2d");
ctx[i].font = "20px Arial";
ctx[i].fillStyle = "black";
ctx[i].textAlign = "center";   
ctx[i].fillText(col1[i], 620+25, 240+i*40);
}
var tempText1=canvas.getContext("2d");
tempText1.font="25px Arial";
tempText1.fillStyle="black";
tempText1.textAlign="center";
tempText1.fillText("n",640,200);
var tempText2=canvas.getContext("2d");
tempText2.font="15px Arial";
tempText2.fillStyle="black";
tempText2.textAlign="center";
tempText2.fillText("p",640+10,200);
//show first row
var tempText3=canvas.getContext("2d");
tempText3.font="25px Arial";
tempText3.fillStyle="black";
tempText3.textAlign="center";
tempText3.fillText("a=1,2,3,4",770,200);
var tempText=["X=1,2","TargetX"];
for (var i = 0; i < 2; i++) {
ctx[i]=canvas.getContext("2d");
ctx[i].font = "25px Arial";
ctx[i].fillStyle = "black";
ctx[i].textAlign = "center";   
ctx[i].fillText(tempText[i], 920+i*100, 200);
}
//draw RMS
var figure=canvas.getContext("2d");
var img=document.getElementById("RMS");
figure.drawImage(img,670,400);
//show weight..final initialization..
var canvas_weight=[]; 
var tag=[];
    for (var i = 0; i < 5; i++) {
        canvas_weight[i]=canvas.getContext("2d");
        canvas_weight[i].font="20px Arial";
        canvas_weight[i].fillStyle="black";
        canvas_weight[i].textAlign="center";
        canvas_weight[i].fillText("W",190,165+i*90);
        ctx[i]=canvas.getContext("2d");
        ctx[i].font="15px Arial";
        ctx[i].fillStyle="black";
        ctx[i].textAlign="center";
        ctx[i].fillText("1"+i+"= ",210,165+i*90); }
    for (var i = 0; i < 5; i++) {
        canvas_weight[i]=canvas.getContext("2d");
        canvas_weight[i].font="20px Arial";
        canvas_weight[i].fillStyle="black";
        canvas_weight[i].textAlign="center";
        canvas_weight[i].fillText("W",330,350+i*30);
        ctx[i]=canvas.getContext("2d");
        ctx[i].font="15px Arial";
        ctx[i].fillStyle="black";
        ctx[i].textAlign="center";
        ctx[i].fillText("2"+i+"= ",353,350+i*30);}


function drawInitialWeight(weight)
{
    var iWeight=create2DArray(2,5);  //j=2 i=5
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 5; i++) {
            iWeight[j][i]=canvas.getContext("2d");
            iWeight[j][i].font="20px Arial";
            iWeight[j][i].fillStyle="blue";
            iWeight[j][i].textAlign="left";
            iWeight[j][i].fillText(weight[j][i], 225+j*140, 165+90*i*(1-j)+185*j+i*30*j);
        }
    }
}

 function drawTargetX(targetX){
  var targetOutput=create2DArray(2,4);
  for (var j = 0; j < 2; j++) {
    for (var p = 0; p < 4; p++) {      
      wipeTableValue(975+j*50,215+40*p);
      targetOutput[j][p]=canvas.getContext("2d");
      targetOutput[j][p].font = "25px Arial";
      targetOutput[j][p].fillStyle = "blue";
      targetOutput[j][p].textAlign = "center";   
      targetOutput[j][p].fillText(targetX[j][p], 920+25+50+j*50, 240+p*40);
  }}}

 function drawInputUnits(input){
    // input[5][4] 
    var inputUnit=create2DArray(4,4);   // do not draw bias unit
    for (var p = 0; p < 4; p++) {
        for (var i = 0; i < 4; i++) {   
        wipeTableValue(675+i*50,215+p*40);  
      inputUnit[i][p]=canvas.getContext("2d");
      inputUnit[i][p].font = "25px Arial";
      inputUnit[i][p].fillStyle = "blue";
      inputUnit[i][p].textAlign = "center";   
      inputUnit[i][p].fillText(input[i+1][p],695+i*50 , 240+p*40);
    }}}

 function drawUpdateWeight(weight){
  var iWeight=create2DArray(2,5);  //j=2 i=5
  var wipe=[];
  for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 5; i++) {
            //clear former print
            wipe[i]=canvas.getContext("2d");
            wipe[i].clearRect(225+j*140, 145+90*i*(1-j)+185*j+i*30*j,40,20);}}
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 5; i++) {
            //redraw line
            line[i]=canvas.getContext("2d");
            line[i].beginPath();
            line[i].moveTo(155,170+i*90);  
            line[i].lineTo(445-50,260+j*180); 
            line[i].stroke();
            line[i].closePath();
            //redraw circle
            outputCircle=canvas.getContext("2d");
            outputCircle.beginPath();
            outputCircle.arc(480-50,260+180,35,0,2*Math.PI); 
            outputCircle.stroke();
            outputCircle.closePath();
            //draw weight
            iWeight[j][i]=canvas.getContext("2d");
            iWeight[j][i].font="20px Arial";
            iWeight[j][i].fillStyle="red";
            iWeight[j][i].textAlign="left";
            iWeight[j][i].fillText(weight[j][i], 225+j*140, 165+90*i*(1-j)+185*j+i*30*j);
 }}}
//every time get a 1D array. one pattern input units. a1,a2,a3,a4 
 function drawInputValue(inputUnit){
    var inputvalue=[];
    for (var i = 0; i < 4; i++) {
      wipeTableValue(105,240+i*90);  
      inputvalue[i]=canvas.getContext("2d");
      inputvalue[i].font = "30px Arial";
      inputvalue[i].fillStyle = "blue";
      inputvalue[i].textAlign = "center";   
      inputvalue[i].fillText(inputUnit[i], 120 , 270+i*90);
 }}

 function drawOutputValue(outputValue,p){
  var output=create2DArray(2,4);
  for (var j = 0; j < 2; j++) {        
      wipeTableValue(875+j*50,215+40*p); 
      output[j][p]=canvas.getContext("2d");
      output[j][p].font = "25px Arial";
      output[j][p].fillStyle = "blue";
      output[j][p].textAlign = "center";   
      output[j][p].fillText(outputValue[j][p], 920+25-50+j*50, 240+p*40);
  }}

 function drawThreshold(threshold){
  var theta=[];
  for (var i = 0; i < 2; i++) {
    wipeCircleValue(440, 250+i*180);
    theta[i]=canvas.getContext("2d");
    theta[i].font = "20px Arial";
    theta[i].fillStyle = "blue";
    theta[i].textAlign = "center";   
    theta[i].fillText(threshold, 470-50+30, 267+i*180);
 }}

 function drawOutputUnit(outputUnit,p){
  var output=create2DArray(2,4);
  for (var j = 0; j < 2; j++) {     
      wipeTableValue(520,225+j*180);    
      output[j][p]=canvas.getContext("2d"); 
      output[j][p].font = "25px Arial"; 
      output[j][p].fillStyle = "blue";
      output[j][p].textAlign = "center";   
      output[j][p].fillText(outputUnit[j][p], 530, 248+j*180);
  }}

 function wipeTableValue(x,y){
    var ctx=canvas.getContext("2d");  
    ctx.clearRect(x,y,30,30);}

 function wipeCircleValue(x,y){
    var ctx=canvas.getContext("2d");  
    ctx.clearRect(x,y,20,25);}

  function wipeVertical(x){
    var ctx=canvas.getContext("2d");  
    ctx.clearRect(x,0,31,579);}


 function showPatternNumber(num){
  wipeVertical(585); // no arrow at all
var line=canvas.getContext("2d");
line.beginPath();
line.moveTo(585,230+num*40);  
line.lineTo(615,230+num*40); 
line.stroke();  
line.closePath();
//draw arrow 
for (var j = 0; j < 2; j++) {
arrow[j]=canvas.getContext("2d");
arrow[j].beginPath();
arrow[j].moveTo(615,230+num*40);
arrow[j].lineTo(615-10,230+num*40-(20-10*Math.sqrt(3))+j*(40-20*Math.sqrt(3)));// 15 degree
arrow[j].stroke();  
arrow[j].closePath();
}
}

function changeIterationNumber(iter){
  var clr=canvas.getContext("2d");
  clr.clearRect(900,80,200,30);
  var ctx=canvas.getContext("2d");
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText(iter,920, 100); 
}

function drawRMS(RMS){
     var clr=canvas.getContext("2d");
  clr.clearRect(920,440,200,30);
var ctx=canvas.getContext("2d");
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "blue";
    ctx.textAlign = "left";
    ctx.fillText(RMS,920,460);
}


