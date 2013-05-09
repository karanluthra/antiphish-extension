/*
Anti-Phish Extension is a chrome extension using Google Safe Browsing Lookup API and Phistank.org Lookup API to guard users against phised sites.
background.js implements the listener to an onBeforeRequest event, which contains code for checking the URL with the two APIs and opening a warning tab incase of confirmed threat. 
*/
var redirectURL = "http://karanluthra.github.io/antiphish-extension/";

chrome.webRequest.onBeforeRequest.addListener(			//http://developer.chrome.com/extensions/webRequest.html
	function(info) {
	console.log(info.url);
	
	var checkURL = encodeURIComponent(info.url);		//https://developer.mozilla.org/en/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
	var gsbURL = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=chrome&apikey=ABQIAAAA-Hxlavz4z8NVViUnPvDL1BTK_nsfFWEX4t9Tt3Mbgn7PtyB-2g&appver=22.0&pver=3.0";

	chrome.tabs.getSelected(null, function(tab){		//get handle on selected tab
	var id=tab.id						//get tab id for us in pageAction events
	
	/*AJAX call to Google Safe Browsing API. Specifications for GSB Lookup API at https://developers.google.com/safe-browsing/lookup_guide#ProtocolSpecification

	Usage of jquery.ajax() at http://api.jquery.com/jQuery.ajax/ */

	$.ajax({						
		url:gsbURL,
		type:"POST",	
		data: "1\n" + checkURL,
		dataType:"text",
		statusCode: {
			200: function(){						//200 ie checkURL is suspected phishing site
				console.log(info.url + " is a valid phish");
				alert("Warning: This maybe a phishing site!");

				chrome.pageAction.show(id);				//enable page action: warning icon in address bar
				
				chrome.tabs.create({url: redirectURL});			//creates a new tab, activates it, loads page at 'redirectURL'
				},
			204: function(checkURL){					//204 ie checkURL is safe, acc to GSB
				console.log("gsb negative, checking phishtank");
				var phtankURL = 'http://checkurl.phishtank.com/checkurl/';

				$.ajax({						//AJAX call to phishtank.org API
					url:phtankURL,
					type:"POST",	
					data: { url : checkURL, app_key : '4ef7449b0aa8ee52ff4de753bf3bdf7f6cdd59a923a247af942ccdd56117e2e5'},
					dataType:"xml",
					success:function(xml){
						
						var results = $(xml).find("in_database");
						
						if(results.text()==="true"){

							console.log("Results: "+ results.text());

							alert("Warning: This maybe a phishing site!");
							chrome.pageAction.show(id);
							chrome.tabs.create({url: redirectURL});	
				
							}
			
						}
     					});						//end of Second AJAX call


				},

			400: function(){
				console.log("400: Bad Request — The HTTP request was not correctly formed");
				},

			503: function(){
				console.log("503: Service Unavailable — The server cannot handle the request. Besides the normal server failures, it could also indicate that the client has been “throttled” by sending too many requests");	
				}


			}

		}); 				//end of first AJAX call
     	});					//end of selected tab scope


},
  // filters for webRequest 
  {
    urls: [
      "http://*/","https://*/","http://*/*","https://*/*"
    ],
    types : ["main_frame", "sub_frame"]		//catches only the specified file type requests, ignores image files, css files, etc
});






















