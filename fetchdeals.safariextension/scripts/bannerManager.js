
function bannerManager(event){
	if(event.name=="DisplayBanner"){
		var request = event.message;
		if (request.action == "LoginBanner"){
			var bannercontent ='';
			bannercontent = bannercontent+'<iframe id="banner" src="http://raquel.dwalliance.com/fetchdeals/banners/banner_autoredirect.php?mid='+request.merchantID+'" scrolling="no"></iframe>';
			
			var stylecontent = '<style>';
			stylecontent = stylecontent +'#banner { background:white; width:100%; display:none; frameborder:0; align:center; height:23px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
			stylecontent = stylecontent +'</style>'

			$('body').prepend(bannercontent);
			$('body').prepend(stylecontent);
			$("#banner").slideDown("slow");
		}
	}
	if(event.name=="FDiframe"){
		var request = event.message;
		if (request.action == "FDiframe"){
			var bannercontent ='';
			bannercontent = bannercontent+'<iframe id="fd_iframe" src="http://demo.fetchdeals.com/DW/safari_ext/get_cookies.html?parentURL='+encodeURIComponent(request.parentURL)+'" scrolling="no"></iframe>';
			
			var stylecontent = '<style>';
			stylecontent = stylecontent +'#fd_iframe { background:white; width:100%; display:none; frameborder:0; align:center; height:23px; seamless:seamless; box-shadow: 2px 0px 2px #000; position: relative;  z-index: 9999;}';
			stylecontent = stylecontent +'</style>'

			$('body').prepend(bannercontent);
			$('body').prepend(stylecontent);
			$("#fd_iframe").slideDown("slow");
		}
	}
};

if(window.top === window){ // just show in top window
	safari.self.addEventListener("message", bannerManager, false);
}

window.addEventListener('message', test, false);

function test(event){
	alert("event " + event.origin);
	alert("message "+ event.data);
	
};

