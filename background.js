chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
	console.log(info.url);
	var res = 0;
	var test= encodeURIComponent(info.url);
	var url = "http://checkurl.phishtank.com/checkurl/index.php?url=" + test;
	var checkUrl = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=chrome&apikey=ABQIAAAA-Hxlavz4z8NVViUnPvDL1BTK_nsfFWEX4t9Tt3Mbgn7PtyB-2g&appver=22.0&pver=3.0&url=" + test;
	var ready=0;
		
		$.ajax({
		url:url,
		type:"POST",	
		dataType:"xml",
		success:function(xml){
			
			console.log(xml);

			var results = $(xml).find("in_database");
			console.log("Results: "+ results.text());
			
			if(results.text()==="true")
			{
				
				alert("PHISHING phtank");
				res=1;
				console.log("res is: " + res);
				ready = 1;
								
			}
		}
       });

		var oReq = new XMLHttpRequest();
		oReq.open("GET", checkUrl, false);
		oReq.send(null);
		if(oReq.status === 400){
			console.log("Error status : " + oReq.status + "for the request :" + test);
		}
		else if(oReq.status === 200){
				
			alert("PHISHING gsb");
			res=1;
			console.log("res is: " + res);	
			ready=1;
		}
		else if(oReq.status === 204){}
		else{
		console.log("Error status : " + oReq.status + "for the request :" + test);
		}


if(res===1 && ready===1){
	return {redirectUrl: "http://akashgupta.my3gb.com/mainpage.html"};
}


},
  // filters
  {
    urls: [
      "http://*/","https://*/","http://*/*","https://*/*"
    ]
  },
  // extraInfoSpec
  ["blocking"]);

