var perceptron = new Object();
//initialization
perceptron.weight= create2DArray(2,5);  // j=2 i=5
perceptron.input= create2DArray(5,4);  // i=5 p=4
perceptron.output= create2DArray(2,4);  // j=2 p=4
perceptron.error=create2DArray(2,4);   //j=2 p=4
perceptron.RMS=0;        
perceptron.n_iter=0;
perceptron.threshold=0;
perceptron.stopValue=0;
perceptron.learningRate=0;
perceptron.targetX=create2DArray(2,4);

perceptron.generateRandomWeight=function(){
for (var j = 0; j < 2; j++) {
		for (var i = 0; i < 5; i++) {
			this.weight[j][i]=Math.floor(Math.random()*4 )*0.5;
}}};

perceptron.calculateError=function(p){
	for (var j = 0; j < 2; j++) {
this.error[j][p]= this.targetX[j][p]-this.output[j][p];
}};

perceptron.calculateOutput=function(p){
for (var j = 0; j < 2; j++) {
	var iState=0;// initiliase instant state =0
 for (var i = 0; i < 5; i++) {
 	iState+=this.weight[j][i]*this.input[i][p];
 }
 if (iState>=this.threshold) {this.output[j][p]=1;}
 	else{this.output[j][p]=0;}
}};

//calculate input pattern
perceptron.updateWeight=function(p){
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < 5; i++) {
		this.weight[j][i]+=this.learningRate*this.input[i][p]*this.error[j][p];
		}}};

perceptron.calculateRMS=function(){
	var t=0; // temperary stroage of error squared
for(var p=0;p<4;p++) { // parttern number=4, assumed			
	for (var j = 0; j < 2; j++) {
	t+=this.error[j][p]*this.error[j][p];
}
this.RMS= Math.sqrt(t/8);
this.RMS=limitLengthOfFloat(this.RMS,this.stopValue.toString().length);
this.n_iter++;//per calculation of RMS, per iteration
}};

function create2DArray(row,col){
var arr= new Array(row);
for (var i = 0; i < row; i++) {
	arr[i]= new Array(col);
}
return arr;
};

//triggered by start and then set the threshold, stop value and maximun iteration.
function defineTrainingSet(){
var count=0; //initialization np=0
var id=["in1","in2","in3","in4"];
document.getElementById("myCanvas").style.display="none";
document.getElementById("setting").style.display="block";
document.getElementById("pattern").innerHTML="Pattern number: 0";
document.getElementById("btn0").removeEventListener("click",defineTrainingSet);//clicked no response when in setting
document.getElementById("tbd").addEventListener("click",function(){
	//if (count>=4) {count=0;}
	 alert(count);
	 document.getElementById("pattern").innerHTML="Pattern number: "+ (count+1);
	 perceptron.input[0][count]=1;//bias
	 for (var i = 1; i < 5; i++) {
	 	perceptron.input[i][count]=document.getElementById(id[i-1]).value; } 
	// get input values of target output   targetX[j][p]
	perceptron.targetX[0][count]=document.getElementById("out1").value;
    perceptron.targetX[1][count]=document.getElementById("out2").value;
    count++; //didn't work well
    if (count==3) {
    perceptron.input[0][3]=1;//bias
	 for (var i = 1; i < 5; i++) {
	 	perceptron.input[i][3]=document.getElementById(id[i-1]).value; } 
	// get input values of 4th target output   
	perceptron.targetX[0][3]=document.getElementById("out1").value;
    perceptron.targetX[1][3]=document.getElementById("out2").value;
    document.getElementById("tbd").value="submit";
	document.getElementById("tbd").id="sub";
    document.getElementById("sub").addEventListener("click", finishSetting);
}})};
document.getElementById("btn0").addEventListener("click", defineTrainingSet);

//randomly generate initial weight of connections
function startClicked(){
	alert("Start generating random weights of connections......");
	perceptron.generateRandomWeight();
	drawInitialWeight(perceptron.weight);
	getParameters();
	alert("Reading input parameters......");
	alert("The learningRate is: "+ perceptron.learningRate+"\nThe stop value is: "+perceptron.stopValue+"\nThe threshold is: "+perceptron.threshold+"\nThe maximun iteration is: "+perceptron.n_iter);
	drawThreshold(perceptron.threshold);
	document.getElementById("btn1").disabled="true";
	document.getElementById("btn0").disabled="true";
}
document.getElementById("btn1").addEventListener("click",startClicked);

//show from pattern 0 to 3, each pattern per next click
var cNext=0;
function nextClicked(){
 //step1: draw input value.
 var inputValue=[];
 for (var i = 0; i < 4; i++) {
 inputValue[i]=perceptron.input[i+1][cNext];}
 drawInputValue(inputValue);
 //step2: alert present pattern number.
 showPatternNumber(cNext);
 //step3: calculate output value
 perceptron.calculateOutput(cNext); 
 drawOutputValue(perceptron.output,cNext);
 drawOutputUnit(perceptron.output,cNext);
 //step4: calculate error
 perceptron.calculateError(cNext);
 //step5: calculate delta weight
 perceptron.updateWeight(cNext);
 drawUpdateWeight(perceptron.weight);
 cNext++;
 if (cNext==4) {
 	alert("one iteration finished, starting calculate RMS......")
 	perceptron.calculateRMS();
 	drawRMS(perceptron.RMS);
 	if (perceptron.RMS>perceptron.stopValue) {
 		changeIterationNumber(perceptron.n_iter); 
 		cNext=0;
 	}else{alert("end"); 
 	document.getElementById("btn4").removeAttribute("disabled");
 }
 }
}
document.getElementById("btn2").addEventListener("click",nextClicked);

function guideClicked(){
   var x= confirm("Are you sure to see the user guide?");
   if (x==true) {
    alert("Now you are backing to User guide page.")
	document.getElementById("userGuide").click(); 
}}
document.getElementById("btn3").addEventListener("click",guideClicked);

function enterTestingSet(){};


function finishSetting(){
    document.getElementById("myCanvas").style.display="block";
    document.getElementById("setting").style.display="none"; 
    document.getElementById("sub").value="continue";
    document.getElementById("sub").id="tbd";
    document.getElementById("btn0").addEventListener("click", defineTrainingSet);
    drawTargetX(perceptron.targetX); //draw target output
    drawInputUnits(perceptron.input);
	alert("Setting finished!");}

function getParameters(){
	perceptron.learningRate=document.getElementById("c").value;
	perceptron.threshold=document.getElementById("threshold").value;
	perceptron.stopValue=document.getElementById("stopvalue").value;
	perceptron.n_iter=document.getElementById('iter').value;
}

function limitLengthOfFloat(number,length){
    var str=number.toString();
    var minus=0;
    for (var i = 0; i < str.length; i++) {
    if (str[i]=='.') {
    	minus=i+1; }}
    if (minus==0) {return number;}
    return number.toFixed(length-minus); 
}



