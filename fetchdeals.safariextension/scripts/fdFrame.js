

var bannercontent = '<iframe id="fetchdeals" src="http://demo.fetchdeals.com/DW/safari_ext/get_cookies.html" scrolling="no"></iframe>';
			
var stylecontent = '<style>';
stylecontent = stylecontent +'#fetchdeals {display:none;}';
stylecontent = stylecontent +'</style>'

$('body').prepend(bannercontent);
$('body').prepend(stylecontent);
//$("#fetchdeals").slideDown("slow");