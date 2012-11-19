safari.self.tab.dispatchMessage("message",{
	'action':	'getPageData',
	'currentURL':	document.location.href,
	'referralURL':	document.referrer,
	'browserName': navigator.userAgent,
	'hostName': document.location.hostname
});