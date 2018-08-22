

function readRes() {
	if (this.readyState==4 && this.status==200)
    {
    	var res = this.responseText;
		lst = res.split('\n');
		sendResponse({mailsdomain: lst});
    }
}

function getList() {
	var mailList = browser.storage.local.get("list");
	if(mailList == null) {
		console.log("Getting list");
	
		var req = new XMLHttpRequest();
		req.onreadystatechange = readRes;
		req.open("GET", "https://raw.githubusercontent.com/AG3/FreeMailDomainList/master/FreeMailDomainList", true);
		req.send();
	}
	console.log("sending response");
	return true;
}

browser.runtime.onMessage.addListener(getList);

