chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
	//alert(info.url);
	checkUrl = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=chrome&apikey=ABQIAAAA-Hxlavz4z8NVViUnPvDL1BTK_nsfFWEX4t9Tt3Mbgn7PtyB-2g&appver=22.0&pver=3.0&url=" + info.url;
	var oReq = new XMLHttpRequest();
	oReq.open("GET", checkUrl, true);
	oReq.onreadystatechange = function (oEvent) {
		if (oReq.readyState === 4) {
			//alert(oReq.status);
			if(oReq.status === 200) {
				
				alert("PHISHING");
				return {redirectUrl: "http://www.google.com"};
			}
		}
	};

	oReq.send(null);

},
  // filters
  {
    urls: [
      "http://*/"
    ]
  },
  // extraInfoSpec
  ["blocking"]);
