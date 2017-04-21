var perceptron = new Object();
//initialization
perceptron.weight= create2DArray(2,5);  // j=2 i=5
perceptron.input= create2DArray(5,4);  // i=5 p=4  
perceptron.output= create2DArray(2,5);  // j=2 p=4 5th is for storing testing value
perceptron.error=create2DArray(2,4);   //j=2 p=4
perceptron.targetX=create2DArray(2,4); //j=2 p=4
perceptron.RMS=0;        
perceptron.n_iter=0;
perceptron.maxIter=0;
perceptron.threshold=0;
perceptron.stopValue=0;
perceptron.learningRate=0;
perceptron.numberOfPattern=0;
var id=["in1","in2","in3","in4"];

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
	t+=this.error[j][p]*this.error[j][p];}}
this.RMS= Math.sqrt(t/8);
this.RMS=limitLengthOfFloat(this.RMS,this.stopValue.toString().length);
this.n_iter++;//per calculation of RMS, per iteration
};

function create2DArray(row,col){
var arr= new Array(row);
for (var i = 0; i < row; i++) {
	arr[i]= new Array(col);
}
return arr;
};

//triggered by start and then set the threshold, stop value and maximun iteration.
function defineTrainingSet(){
perceptron.numberOfPattern=0; //initialization np=0
document.getElementById("myCanvas").style.display="none";
document.getElementById("setting").style.display="block";
document.getElementById("pattern").innerHTML="Pattern number: 0";
document.getElementById("btn0").removeEventListener("click",defineTrainingSet);//clicked no response when in setting
document.getElementById("tbd").onclick=function(){continueClicked();}};

document.getElementById("btn0").addEventListener("click", defineTrainingSet);

function continueClicked(){
    perceptron.input[0][perceptron.numberOfPattern]=1;//bias
	for (var i = 1; i < 5; i++) {
	perceptron.input[i][perceptron.numberOfPattern]=document.getElementById(id[i-1]).value; 
	if (!validateBoundOfInput(perceptron.input[i][perceptron.numberOfPattern],0,1)) {
		alert("Please check input units, they should be 0 or 1.");
		return;}} 
	// get input values of target output   targetX[j][p]
	perceptron.targetX[0][perceptron.numberOfPattern]=document.getElementById("out1").value;
    perceptron.targetX[1][perceptron.numberOfPattern]=document.getElementById("out2").value;
    if (!validateBoundOfInput(perceptron.targetX[0][perceptron.numberOfPattern],0,1)||
        !validateBoundOfInput(perceptron.targetX[1][perceptron.numberOfPattern],0,1)) {
    	alert("Please check target outputs, they should be 0 or 1.");
		return;}
	document.getElementById("pattern").innerHTML="Pattern number: "+ (perceptron.numberOfPattern+1);
	document.getElementById("myTable").rows[perceptron.numberOfPattern+1].cells[2].innerHTML=
	perceptron.targetX[0][perceptron.numberOfPattern]+
	perceptron.targetX[1][perceptron.numberOfPattern];
	document.getElementById("myTable").rows[perceptron.numberOfPattern+1].cells[1].innerHTML=
    perceptron.input[1][perceptron.numberOfPattern]+
    perceptron.input[2][perceptron.numberOfPattern]+
    perceptron.input[3][perceptron.numberOfPattern]+
    perceptron.input[4][perceptron.numberOfPattern];
    perceptron.numberOfPattern++;
    if (perceptron.numberOfPattern==3) {
    document.getElementById("tbd").style.display="none";
	document.getElementById("sub1").style.display="block";
	document.getElementById("sub1").onclick= function(){finishSetting(perceptron.numberOfPattern,id);};
    }	
}

function modifyTrainingSet(){
	var str=prompt("Choose which pattern (0-3) to modify:","0");
	if (!str) return; // click "cancle"
	perceptron.numberOfPattern=str;
	if(!validateBoundOfInput(perceptron.numberOfPattern,0,3)) return;
	document.getElementById("myCanvas").style.display="none";
    document.getElementById("setting").style.display="block";
    document.getElementById("pattern").innerHTML="Pattern number: "+perceptron.numberOfPattern;
    document.getElementById("tbd").style.display="none";
    document.getElementById("btn01").removeEventListener("click",modifyTrainingSet);
    document.getElementById("sub2").onclick=function(){finishSetting(perceptron.numberOfPattern,id);};
    showPatternNumber(perceptron.numberOfPattern);
}

//randomly generate initial weight of connections
function startClicked(){
	getParameters();
	alert("Reading input parameters......");
	var exit=false;
	if (!validateLengthOfInput(perceptron.learningRate,5)) {
		alert("Please enter learning rate again, the max length is 5 (including the symbol '.')!");
		exit=true;}
	if(!validateLengthOfInput(perceptron.stopValue,10)) {
		alert("Please enter stop value again, the max length is 10 (including the symbol '.')!");
		exit=true;}
	if(!validateLengthOfInput(perceptron.threshold,3)) {
		alert("Please enter threshold again, the max length is 3 (including the symbol '.')!");
		exit=true;}
	if (!Number.isInteger(Number(perceptron.maxIter))) {
		alert("Please enter maximun iteration again, the input should be an integer!");
		exit=true;}
	if(!validateLengthOfInput(perceptron.maxIter,3)) {
		alert("Please enter maximun iteration again, the max length is 3!");
		exit=true;}
	if (perceptron.learningRate<=0 || perceptron.stopValue<=0 || perceptron.maxIter<=0) {
		alert("Your input is not positive.\nPlease enter it again!");
		exit=true;}
	if (exit) return;
	alert("The learningRate is: "+ 
		perceptron.learningRate+"\nThe stop value is: "+
		perceptron.stopValue+"\nThe threshold is: "+
		perceptron.threshold+"\nThe maximun iteration is: "+
		perceptron.maxIter);
	alert("Start generating random weights of connections......");
	perceptron.generateRandomWeight();
	drawInitialWeight(perceptron.weight);
	drawThreshold(perceptron.threshold);
	document.getElementById("c").disabled="true";
	document.getElementById("stopvalue").disabled="true";
	document.getElementById("threshold").disabled="true";
	document.getElementById("iter").disabled="true";
	document.getElementById("btn1").disabled="true";
	document.getElementById("btn0").disabled="true";
	document.getElementById("btn01").disabled="true";
	document.getElementById("btn2").removeAttribute("disabled");
}
document.getElementById("btn1").addEventListener("click",startClicked);

//show from pattern 0 to 3, each pattern per next click

function nextClicked(){
 document.getElementById("btn2").removeEventListener("click",nextClicked);
 if (perceptron.n_iter<perceptron.maxIter)
 learningProcess();
 }
document.getElementById("btn2").addEventListener("click",nextClicked);

function guideClicked(){
   var x= confirm("Are you sure to see the user guide?");
   if (x==true) {
    alert("Now you are backing to User guide page.")
	document.getElementById("userGuide").click(); 
}}
document.getElementById("btn3").addEventListener("click",guideClicked);

function enterTestingSet(){
	var t=["t1","t2","t3","t4"];
    document.getElementById("myCanvas").style.display="none";
    document.getElementById("testing").style.display="block";
    document.getElementById("pattern1").innerHTML="Please enter your testing inputs.";
    document.getElementById("btn4").removeEventListener("click",enterTestingSet);
    document.getElementById("sub").style.display="block";
    document.getElementById("sub").onclick=function(){readTestingInput(t);};

};
document.getElementById("btn4").addEventListener("click",enterTestingSet);

function readTestingInput(t){
document.getElementById("myCanvas").style.display="block";
document.getElementById("testing").style.display="none"; 
perceptron.input[0][4]=1;//bias
var input_test=[];	
for (var i = 1; i < 5; i++) {
perceptron.input[i][4]=document.getElementById(t[i-1]).value; 
if (!validateBoundOfInput(perceptron.input[i][4],0,1)) {
	alert("Please check input units, they should be 0 or 1.");
	return;}
input_test[i-1]=perceptron.input[i][4];}
//step 0: clean vertical arrow
	wipeVertical(585);
	//step1: draw input value.
    drawInputValue(input_test);
 //step2: calculate output value
    perceptron.calculateOutput(4); 
    drawOutputUnit(perceptron.output,4);
 //step3: show testing!
    showTesting(true);
 //step4: pattern recognization
    recogizePattern();
document.getElementById("btn4").addEventListener("click",enterTestingSet);
}

//for testing
function recogizePattern(){
    var trigger=0;
for (var p = 0; p < 4; p++) {
	var count=0;
	for (var i = 0; i < 2; i++) {
		if (perceptron.output[i][4]==perceptron.targetX[i][p]) {count++;}}
	if (count==2) {
		perceptron.numberOfPattern=p;
		trigger++;
		showTestingResult(true);}}
	if (trigger==0) showTestingResult(false);}   

//for define/modify
function checkDuplicateDefine(){
for(var m=0;m<3;m++){
for (var k = m+1; k < 4; k++) {
var count=0;
for (var i = 1; i < 5; i++) {
if (perceptron.input[i][m]==perceptron.input[i][k]) count++;
if (count==4) {  //4 inputs are identical.
	var temp=0;
	for (var j = 0; j < 2; j++) {
	if (perceptron.targetX[j][m]==perceptron.targetX[j][k]) temp++;
	if (temp==2) {//2 target outputs are identical
	alert("The training set has duplicate pattern.\nPlease define it again!");
	return true;
}}}}}}return false;}

function finishSetting(np,id){
	perceptron.input[0][np]=1;//bias
	for (var i = 1; i < 5; i++) {
	perceptron.input[i][np]=document.getElementById(id[i-1]).value;
	if (!validateBoundOfInput(perceptron.input[i][np],0,1)) {
		alert("Please check input units, they should be 0 or 1.");
		return;}} 
	// get input values of target output   targetX[j][p]
	perceptron.targetX[0][np]=document.getElementById("out1").value;
    perceptron.targetX[1][np]=document.getElementById("out2").value;
    if (!validateBoundOfInput(perceptron.targetX[0][np],0,1)||
        !validateBoundOfInput(perceptron.targetX[1][np],0,1)) {
    	alert("Please check target outputs, they should be 0 or 1.");
		return;}
    document.getElementById("myCanvas").style.display="block";
    document.getElementById("setting").style.display="none";
    drawInputUnits(perceptron.input);
    drawTargetX(perceptron.targetX); //draw target output
    document.getElementById("myTable").rows[4].cells[2].innerHTML=
	perceptron.targetX[0][3]+
	perceptron.targetX[1][3];
	document.getElementById("myTable").rows[4].cells[1].innerHTML=
	perceptron.input[1][3]+
	perceptron.input[2][3]+
	perceptron.input[3][3]+
	perceptron.input[4][3];
    // if all patterns are different, tbd...
    if(checkDuplicateDefine()) {
    document.getElementById("tbd").style.display="block";
	document.getElementById("sub1").style.display="none";
    document.getElementById("btn0").addEventListener("click",defineTrainingSet);
    document.getElementById("btn01").addEventListener("click", modifyTrainingSet);
    document.getElementById("btn1").disabled="true";
    return;
    }
    document.getElementById("sub1").style.display="none";
    document.getElementById("sub2").style.display="block";
    document.getElementById("btn0").style.display="none";
    document.getElementById("btn01").style.display="initial";
    document.getElementById("btn01").addEventListener("click", modifyTrainingSet);
    document.getElementById("btn1").removeAttribute("disabled");
	alert("Setting finished!");}

function getParameters(){
	perceptron.learningRate=document.getElementById("c").value;
	perceptron.stopValue=document.getElementById("stopvalue").value;
	perceptron.threshold=document.getElementById("threshold").value;
	perceptron.maxIter=document.getElementById("iter").value;
}

function validateBoundOfInput(x,lowerbound,upperbound){
	try{
		if (x== "") throw "empty";
		if (isNaN(x)) throw "invalid";
		if (!isInteger(x)) throw "not an integer";
		x=Number(x); //get the value of string
		if (x<lowerbound) throw "too small";
		if (x>upperbound) throw "too large";
	}
	catch(err){
        alert("Your input is "+err);
        return false;
	}
	return true;}

function isInteger(x){
	for (var i = 0; i < x.length; i++) {
		if(x[i]=='.') return false;	
	}return true;
}

function limitLengthOfFloat(number,length){
    var str=number.toString();
    var minus=0;
    for (var i = 0; i < str.length; i++) {
    if (str[i]=='.') {
    	minus=i+1; }}
    if (minus==0) {return number;}
    return parseFloat(number.toFixed(length-minus)); 
}

function validateLengthOfInput(x,max_length){
    try{
        if (x== "") throw "empty";
		if (isNaN(x)) throw "invalid";
		if (x.length>max_length) throw "too long";    
    }
    catch(err){
    alert("Your input is "+err);
    return false;
    }
    return true;
}

var nop=0;//number of pattern
function learningProcess(){
	//step 0: clean vertical arrow
	 wipeVertical(585);
	//step1: draw input value.
	var inputValue=[];
	for (var i = 0; i < 4; i++) {
    inputValue[i]=perceptron.input[i+1][nop];}
    drawInputValue(inputValue);
    //step2: calculate output value
    perceptron.calculateOutput(nop); 
    drawOutputValue(perceptron.output,nop);
    drawOutputUnit(perceptron.output,nop);
    //step3: show current pattern
    showPatternNumber(nop);
    //step4: calculate error
    perceptron.calculateError(nop);
    //step5: calculate delta weight
    perceptron.updateWeight(nop);
    drawUpdateWeight(perceptron.weight);
 if (nop==3) {
 	nop=0;
 	clearTimeout(timeOutId);
 	document.getElementById("btn2").addEventListener("click",nextClicked);
 	alert("One iteration finished, starting calculate RMS......");
 	perceptron.calculateRMS();//iter++
 	drawRMS(perceptron.RMS);
 	if (perceptron.n_iter==perceptron.maxIter){ 
    alert("Reached maximun iteration times!\nThe perceptron is not converged!");
    document.getElementById("btn2").disabled="true";
    showTesting(false); // not converged
    return;}
 	if (perceptron.RMS>perceptron.stopValue){
 	changeIterationNumber(perceptron.n_iter);} 
 	else{alert("RMS is less than the stopValue, the computation is stopped!"); 
 	document.getElementById("btn2").disabled="true";
 	document.getElementById("btn4").removeAttribute("disabled");
 }return;}
    timeOutId=setTimeout(learningProcess,1500); //delay 1.5 secs
    nop++;
 }


 
