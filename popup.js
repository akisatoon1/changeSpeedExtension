function sendMessage(status) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id, { "action": status }
            );
        }
    );
}
function memory() {
    sendMessage("memory");
}
function deletE() {
    sendMessage("delete");
}
document.querySelector("#memory").addEventListener("click", memory);
document.querySelector("#delete").addEventListener("click", deletE);
document.querySelector('#go-to-options').addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});
/*document.querySelector("#test").addEventListener("click", () => {
    chrome.storage.sync.get(null, (items) => {
        console.log(items);
    });
});*/
