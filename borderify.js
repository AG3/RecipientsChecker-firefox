var t = document.getElementsByClassName("wui-AddrInput");
// the page has three(3) wui-AddrInput, but only the first one is the real one
var reciverAddrList = t[0]
console.log(reciverAddrList);
var config = { attributes: false, childList: true, subtree: true };

var domainList = null;

function handleResponse(message) {
	console.log("!!!!")
	domainList = message;
	console.log(message);
}

function handleError(error) {
	console.log(`My Error: ${error}`);
}

console.log("sending req")
var sending = browser.runtime.sendMessage({});
sending.then(handleResponse, handleError); 

var isValidAddr = function(addr){
	var dm = addr.split('@')[1];
	return (domainList.indexOf(dm) != -1);
}

var callback = function(mutationList) {
	console.log("in callback");
	// console.log(mutationList);
	// since manual operation can only change one record at one time, we only take the first element in the list
	var firstMutation = mutationList[0];
	if(firstMutation.addedNodes.length <= 0) {
		return;
	}
	var mutatedNode = firstMutation.addedNodes[0];
	console.log(mutatedNode)
	var rawEmailAddr = mutatedNode.attributes.title.nodeValue;
	console.log(rawEmailAddr)
	if(!isValidAddr(rawEmailAddr)) {
		// As a reminder, I guess this is the most practical approach in the beginning
		mutatedNode.style.backgroundColor = "red"
	}
}

var observer = new MutationObserver(callback);

observer.observe(reciverAddrList, config);

//Do I need to disconnect the observer?