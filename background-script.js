var req = new XMLHttpRequest();
var mailList = browser.storage.local.get("list");
var RES_LIST = null;
function saveRes(data) {
	console.log(data.length)
	RES_LIST = data;
}

function onGetSuccess(item) {
	if((typeof item.length) == 'number') {
		console.log("Read from local storage")
		saveRes(item);
	} else {
		console.log("No local stroage")
		req.onreadystatechange = function(){
			if (req.readyState==4 && req.status==200)
		    {
		    	var res = req.responseText;
				var lst = res.split('\n');
				saveRes(lst);
		    }
		}
		req.open("GET", "https://raw.githubusercontent.com/AG3/FreeMailDomainList/master/FreeMailDomainList", true);
		req.send();
		console.log(req.readyState, req.status)
		
	}
}

function onGetFailed(err) {
	console.log(err)
}

mailList.then(onGetSuccess, onGetFailed);

function getList(req, sender, sendResponse) {
	console.log(RES_LIST)
	sendResponse(RES_LIST)
}
console.log("asdas")
browser.runtime.onMessage.addListener(getList);
console.log("asdas")
