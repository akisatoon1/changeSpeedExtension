function sendMessage(status) {
    /*chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id, { "action": status }
            );
        }
    );*/
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id, { "action": status }
            ).catch(() => {
                alert("エラー！！。動画再生ページで操作を行ってください。")
            });
        }
    );
}
function memory() {
    sendMessage("memory");
}
function deletE() {
    sendMessage("delete");
}

// スピード記録ボタン
document.querySelector("#memory").addEventListener("click", memory);

// 記録削除ボタン
document.querySelector("#delete").addEventListener("click", deletE);

// 設定画面ボタン
document.querySelector('#go-to-options').addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});
