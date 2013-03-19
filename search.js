//var http = new XMLHttpRequest();
var test= "http://sac123.my3gb.com/facebook.html";
var url = "http://checkurl.phishtank.com/checkurl/index.php?url=" + test;


  $.ajax({
		url:url,
		type:"POST",	
		dataType:"xml",
		success:function(xml){
			
			console.log(xml);

			var results = $(xml).find("in_database");
			console.log("Results: "+ results.text());
		}
       });



//var params = "url=http://www.google.com&format=xml&app_key=4ef7449b0aa8ee52ff4de753bf3bdf7f6cdd59a923a247af942ccdd56117e2e5";

