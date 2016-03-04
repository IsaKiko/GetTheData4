var header_text = 'Who benefits from negative gearing?';
//var header_text = 'Some other random question we want answers to..';

var sheetidQuestion = "1i8so_LcvcBGO-Ozi2lPAHmC-oPRKuCpdazFT9z0hQkg";
var sheetidAnswer = "1lNHAd89I2RASRHv992pCdBNdlUvsn1SO0yrLwPAjrIk";

var xmlhttp = new XMLHttpRequest();
var url = "https://script.google.com/macros/s/AKfycbwrK6hgwI8Yg0HSCGzlT3l9af4YUVLlusQXvfqTC5rtZfOPWis/exec?requestType=getdata&sheetid="+sheetidQuestion;

xmlhttp.onreadystatechange = function() {
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       var myArr = JSON.parse(xmlhttp.responseText);
       myFunction(myArr);
   }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(questions) {
	// var json_q = JSON.parse(questions);
	// console.log(json_q);

var page_w = 1100;
var page_w_px = page_w + 'px'
var main_h = 400;
var main_w = (page_w*2)+(page_w*questions.length);
var main_w_px = main_w + 'px'
var trans_exp = 100;
var moveleft = '-'+page_w_px;

var page_h = window.innerHeight;
var page_h_px = page_h + 'px'
var main_h = (page_h*2)+(page_h*questions.length);
var main_h_px = main_h + 'px'
var moveinitial = -page_h;
var moveup = moveinitial;


var main = d3.select("#main").style("min-width", main_w_px).style("height", main_h_px).style("position","absolute");


var titlepage = main.append("div").style("min-width", page_w_px).style("min-height", page_h_px).style("position","relative").style("left","0px").style("top","0px").style("display","inline-block");


var header = titlepage.append("h1").text(header_text);
var cont_btn = titlepage.append("button").text("start the quiz").attr("class","btn btn-default start");


for (var q_idx = 0; q_idx< questions.questions.length; q_idx++){

	var page = [];
	var options = [];
	var question_text = [];
	var qheader =[];
	var qid = "QID"+q_idx;
	var qid_selector = "#"+qid;
	var aheader =[];
	var a_idx = q_idx + questions.questions.length;
	var aid = "AID"+a_idx;
	var aid_selector = "#"+aid;
	var answer_text = [];

	page[q_idx] = main.append("div").attr("id",qid).style("min-height", page_h_px).style("min-width", page_w_px).style("position","relative").style("left","0px").style("top","0px").style("display","inline-block");
	
	options[q_idx] = questions.questions[q_idx].options.split(",");
	question_text[q_idx] = questions.questions[q_idx].question;
	qheader[q_idx] = page[q_idx].append("h1").text(question_text[q_idx]);

	var buttons = [];
	var i = [];
	var yesno = "Isn't this interesting..?";

	for (var i = 0; i< options[q_idx].length; i++){
		

		var correct = questions.questions[q_idx].correct.split(",");

		var class_str = "C"+correct[i] +" btn btn-default";
		buttons[i] = d3.select(qid_selector).append("button").text(options[q_idx][i]).attr("class",class_str).attr("id","Q,"+q_idx+",A,"+i)
		.attr("question",questions.questions[q_idx].text).attr("answer",options[q_idx][i])
		.on("click",function(){
//			sendReport(question_text[q_idx],options[q_idx][i]);
			console.log(this.className[1])
			 if (this.className[1] == "1"){
			 	 console.log("well done");				
			 } else {
			 	console.log("Not quite...");
			 }	

			scroll();
			sendReport(this.id)
			
		});

	}
			

	page[a_idx] = main.append("div").attr("class","container").attr("id",aid).style("min-height", page_h_px).style("min-width", page_w_px).style("position","relative").style("left","0px").style("top","0px").style("display","inline-block");
//	var correct[a_idx] = 1; // NEEDS LOGIC
//	console.log(questions.questions[q_idx].text);

//	aheader[a_idx] = page[a_idx].append("div").text(answer_text[q_idx]);
	answer_text[a_idx] = d3.select(aid_selector)
	.append("h1").text(yesno)

	var plot_div = document.createElement('div');

	plot_div.innerHTML = questions.questions[q_idx].plot;	
	document.getElementById(aid).appendChild(plot_div);

	plot_div.className = "plot_div";


	var flexdiv = d3.select(aid_selector).append("div").attr("class","container");
	flexdiv.append("div").text(questions.questions[q_idx].text).attr("class","text")
	flexdiv.append("button").text("continue..").attr("class","scroll btn btn-default continue");

}

// move titlepage

d3.selectAll('.scroll').on("click",function(){
	scroll();
})

// var answer_buttons0 = d3.selectAll(".C0");
// answer_buttons0.on("click",function(){
// 	console.log("wrong");
// 	scroll();
// })

// var answer_buttons1 = d3.selectAll(".C1");
// answer_buttons1.on("click",function(){
// 	console.log("correct");
// 	scroll();
// })


cont_btn.on("click", function(){

    //transition
	titlepage.transition().duration(500).style("top",moveup+"px");
	scroll();




	});

var scroll = function(){
		for (var t_idx = 0; t_idx< questions.questions.length*2; t_idx++){
		var temp_qid = "#QID"+t_idx;
		var temp_aid = "#AID"+t_idx;
		d3.select(temp_qid).transition().duration(500).style("top",moveup+"px");
		d3.select(temp_aid).transition().duration(500).style("top",moveup+"px");
	}

	moveup = moveup+ moveinitial;
	console.log(moveup);
}

var sendReport = function(id){
    console.log(id);

    var id_array = id.split(",");
    var qid = id_array[1];
    var answer = id_array[3];
    var questiontext = questions.questions[qid].question;
    var answertext = questions.questions[qid].options.split(",")[answer];


    var xmlhttpagain = new XMLHttpRequest();
    var urlagain = "https://script.google.com/macros/s/AKfycbwrK6hgwI8Yg0HSCGzlT3l9af4YUVLlusQXvfqTC5rtZfOPWis/exec?requestType=postdata&qid="+qid+"&answer="+answer+"&questiontext="+questiontext+"&answertext="+answertext+"&sheetid="+sheetidAnswer;

    xmlhttpagain.onreadystatechange = function() {
        if (xmlhttpagain.readyState == 4 && xmlhttpagain.status == 200) {
            var myArr = JSON.parse(xmlhttpagain.responseText);
            myFunctionNew(myArr);
        }
    };
    xmlhttpagain.open("GET", urlagain, true);
    xmlhttpagain.send();

    function myFunctionNew(result) {
        console.log(result)
    }

}


}

