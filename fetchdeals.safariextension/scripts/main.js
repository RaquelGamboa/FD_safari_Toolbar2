var currentURL=	document.location.href;
var referralURL=	document.referrer;
var browserName= navigator.userAgent;
var hostName= document.location.hostname;
hostName = getDomain(hostName);
var merchantID;	
var tbCookie;
var fuidCookie;
var lbCookie;
function mainProcess(event){
	
	if(event.name=="startProcess"){ 
		console.log("EMPEZAMOS ACA");
				
		console.log(browserName);
		console.log(currentURL);
		console.log(referralURL);
		console.log(hostName);
		
		safari.self.tab.dispatchMessage("GetMerchant",{
			'action':	'GetMerchant',
			'hostName':	hostName
		});		
	}
	if(event.name=="GetMerchant"){
		console.log(event.message.merchantFound);
		merchantID = event.message.merchantID;
		if(event.message.merchantFound == "YES"){
			var bannercontent ='';
			bannercontent = bannercontent+'<iframe id="fd_iframe" src="http://demo.fetchdeals.com/DW/safari_ext/get_cookies.html?parentURL='+encodeURIComponent(currentURL)+'" scrolling="no"></iframe>';
			
			var stylecontent = '<style>';
			stylecontent = stylecontent +'#fd_iframe { background:white; width:100%; display:none; frameborder:0; align:center; height:23px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
			stylecontent = stylecontent +'</style>'

			$('body').prepend(bannercontent);
			$('body').prepend(stylecontent);
			//$("#fd_iframe").slideDown("slow");
			
			window.addEventListener('message', loginBannerDisplay, false);
			
		}
	}
	if(event.name=="GetLinks"){
		console.log(event.message.clickURL);
		console.log(event.message.NoAutoStatus);
		console.log(event.message.bannerClickResponse);
		
		redirectBannerDisplay(event.message.clickURL, event.message.NoAutoStatus, event.message.bannerClickResponse);
		
	}

};


if(window.top === window){ // just show in top window
	safari.self.addEventListener("message", mainProcess, false);
}

function redirectBannerDisplay(clickURL, NoAutoStatus, bannerClickResponse){

	var NoAuto = CheckAutoRedirect(currentURL, referralURL);
	var fdlrCookie = getBannerCookie("fdlr");
	console.log("FDLR VALUE: "+ fdlrCookie);
	
	if( fdlrCookie == 1){
		console.log("Show autoredirect banner");
		setBannerCookie("fdlr", 2);
		autoRedirectBannerDisplay();
	
	}else{
		// auto redirect when the cookie is 0 and noAuto =0
		if (fdlrCookie == 0  && (NoAuto==0 && NoAutoStatus==0)){
			console.log("Redirecting");
			setBannerCookie("fdlr", 1);
			document.location = clickURL;
		}
		// show click banner
		if (fdlrCookie == 0  && (NoAuto==1 || NoAutoStatus==1)){
			console.log("Show NO autoredirect banner");
			setBannerCookie("fdlr", 3);
			noAutoRedirectBannerDisplay();
			  
		}
		// show click second banner
		if (fdlrCookie == 3  && bannerClickResponse=="Updated to 0"){
			console.log("Show NO autoredirect second banner");
			setBannerCookie("fdlr", 4);
			noAutoRedirectSecondBannerDisplay();
			  
		}
	}


};


function getBannerCookie(cookieName){
	if(document.cookie){
		var arr = document.cookie.split((escape(cookieName) + '='));
		if(arr.length >= 2){
			var arr2 = arr[1].split(';');
			CookieVal  = unescape(arr2[0]); //unescape() : Decodes the String
			return CookieVal;
		}
		return 0;
	}
};

function setBannerCookie(cookieName, cookieValue){
	var date = new Date();
	date.setTime(date.getTime()+(60*60*6*1000)); // 6 hours
	var expires = "; expires="+date.toGMTString();
	
	document.cookie = cookieName+"="+cookieValue+expires+"; path=/";
	console.log("FDLR cookie created, value: " + cookieValue);
};


/*Check if the merchant URL has properties to autoredirect or not*/
function CheckAutoRedirect(currentURL, referralURL){
    
    findGoogle = referralURL.search(/.google./i);
    findAclk = referralURL.search(/aclk/i);
    findAfsrc = currentURL.search(/afsrc=1/i);
    
	console.log("FIND GOOGLE: "+findGoogle); 
    console.log("FIND ACLK: "+findAclk); 
    console.log("FIND AFSRC: "+findAfsrc);
	
    if (((findGoogle!=-1)&&(findAclk!=-1))|| (findAfsrc!=-1)){
    
        return 1;
    }else{
        return 0;
    }
   
    
};

function noAutoRedirectBannerDisplay(){
	var bannercontent ='';
		bannercontent = bannercontent+'<iframe id="banner" src="http://raquel.dwalliance.com/fetchdeals/banners/banner_noautoredirect.php?mid='+merchantID+'&memid='+tbCookie+'" scrolling="no"></iframe>';
		
		var stylecontent = '<style>';
		stylecontent = stylecontent +'#banner { background:white; width:100%; display:none; frameborder:0; align:center; height:66px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
		stylecontent = stylecontent +'</style>'

		$('body').prepend(bannercontent);
		$('body').prepend(stylecontent);
		$("#banner").slideDown("slow");
};

function noAutoRedirectSecondBannerDisplay(){
	var bannercontent ='';
		bannercontent = bannercontent+'<iframe id="banner" src="http://raquel.dwalliance.com/fetchdeals/banners/banner_noautoredirect2.php?mid='+merchantID+'" scrolling="no"></iframe>';
		
		var stylecontent = '<style>';
		stylecontent = stylecontent +'#banner { background:white; width:100%; display:none; frameborder:0; align:center; height:66px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
		stylecontent = stylecontent +'</style>'

		$('body').prepend(bannercontent);
		$('body').prepend(stylecontent);
		$("#banner").slideDown("slow");
};

function autoRedirectBannerDisplay(){
	var bannercontent ='';
		bannercontent = bannercontent+'<iframe id="banner" src="http://raquel.dwalliance.com/fetchdeals/banners/banner_autoredirect.php?mid='+merchantID+'" scrolling="no"></iframe>';
		
		var stylecontent = '<style>';
		stylecontent = stylecontent +'#banner { background:white; width:100%; display:none; frameborder:0; align:center; height:23px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
		stylecontent = stylecontent +'</style>'

		$('body').prepend(bannercontent);
		$('body').prepend(stylecontent);
		$("#banner").slideDown("slow");
};

function loginBannerDisplay(event){
	console.log("event " + event.origin);
	console.log("message "+ event.data);
	cookies = event.data;
	cookies = cookies.split("-");
	tbCookie = cookies[0];
	fuidCookie = cookies[1];
	lbCookie = cookies[2];
	if (tbCookie == 0 && lbCookie == 0){
		
		var bannercontent ='';
		bannercontent = bannercontent+'<iframe id="banner" src="http://raquel.dwalliance.com/fetchdeals/banners/banner_login.php" scrolling="no"></iframe>';
		
		var stylecontent = '<style>';
		stylecontent = stylecontent +'#banner { background:white; width:100%; display:none; frameborder:0; align:center; height:23px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
		stylecontent = stylecontent +'</style>'

		$('body').prepend(bannercontent);
		$('body').prepend(stylecontent);
		$("#banner").slideDown("slow");
	
	}else{ // if the member is logged in
		
		if (tbCookie == 0 ){
			tbCookie=fuidCookie;
		}
		// Post data into log
		safari.self.tab.dispatchMessage("postData",{
			'action':	'postData',
			'tbCookie':	tbCookie,
			'referralURL': referralURL,
			'URL': currentURL,
			'browserName': browserName
		});
		
		safari.self.tab.dispatchMessage("GetLinks",{
			'action':	'GetLinks',
			'hostName':	hostName,
			'tbCookie': tbCookie
		});
		
		
	
	}

};

function getDomain(url){
    url = url.split(".");
    var hostName = "";
    if (url.length !=2){
        for(var i = url.length-1; i>0; i--){
            if (hostName==""){ 
                hostName=url[url.length -i];
            }else{
                hostName=hostName+"."+url[url.length -i];
            }
        }
    }else{
        hostName=url[url.length -2]+"."+url[url.length -1];
    }
    //console.log("DOMAIN NAME: "+hostName);    
    return hostName;
};	

