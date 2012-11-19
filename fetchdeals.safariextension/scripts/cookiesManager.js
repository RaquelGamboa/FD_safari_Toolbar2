function cookieManager(event){
	if(event.name=="cookieSet"){
		var request = event.message;
		alert(request.action);
		if (request.action == "setFDLR"){
			var date = new Date();
			date.setTime(date.getTime()+(60*60*6)); // 6 hours
			var expires = "; expires="+date.toGMTString();
			
			document.cookie = request.cookieName+"="+request.cookieValue+expires+"; path=/";
			console.log("cookie created");
		}
	}
	if(event.name=="cookieGet"){
		var request = event.message;
		alert(request.action);
		if(document.cookie){
			var arr = document.cookie.split((escape(request.cookieName) + '='));
			if(arr.length >= 2){
				var arr2 = arr[1].split(';');
       		    CookieVal  = unescape(arr2[0]); //unescape() : Decodes the String
				alert(CookieVal);
				safari.self.tab.dispatchMessage("CookieValue",theData);
			}
		}
	
	}
};
safari.self.addEventListener("message", cookieManager, false);



