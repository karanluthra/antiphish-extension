var redirectURL = "http://karanluthra.github.io/antiphish-extension/";

chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
	console.log(info.url);
	
	var checkURL = encodeURIComponent(info.url);
	var gsbURL = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=chrome&apikey=ABQIAAAA-Hxlavz4z8NVViUnPvDL1BTK_nsfFWEX4t9Tt3Mbgn7PtyB-2g&appver=22.0&pver=3.0";

	$.ajax({
		url:gsbURL,
		type:"POST",	
		data: "1\n" + checkURL,
		dataType:"text",
		statusCode: {
			200: function(){
				console.log(info.url + " is a valid phish");
				alert("Warning: This maybe a phishing site!");
				
				chrome.tabs.create({url: redirectURL});
				},
			204: function(checkURL){
				console.log("gsb negative, checking phishtank");
				var phtankURL = 'http://checkurl.phishtank.com/checkurl/';

				$.ajax({
					url:phtankURL,
					type:"POST",	
					data: { url : checkURL, app_key : '4ef7449b0aa8ee52ff4de753bf3bdf7f6cdd59a923a247af942ccdd56117e2e5'},
					dataType:"xml",
					success:function(xml){
						
						var results = $(xml).find("in_database");
						
						if(results.text()==="true"){

							console.log(xml);
							console.log("Results: "+ results.text());

							alert("Warning: This maybe a phishing site!");
							
							chrome.tabs.create({url: redirectURL});	
				
							}
			
						}
     					});


				},

			400: function(){
				console.log("400: Bad Request — The HTTP request was not correctly formed");
				},

			503: function(){
				console.log("503: Service Unavailable — The server cannot handle the request. Besides the normal server failures, it could also indicate that the client has been “throttled” by sending too many requests");	
				}


			}
     	});


},
  // filters
  {
    urls: [
      "http://*/","https://*/","http://*/*","https://*/*"
    ],
    types : ["main_frame", "sub_frame"]
  });

