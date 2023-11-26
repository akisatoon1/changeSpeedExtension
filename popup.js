function sendMessage(status) {

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

// スピード記録ボタン
document.querySelector("#memory").addEventListener("click", (event) => {

    if (event.target.tagName == "button") {

        sendMessage("memory");

    }
});

// 記録削除ボタン
document.querySelector("#delete").addEventListener("click", (event) => {

    if (event.target.tagName == "button") {

        sendMessage("delete");
    }
});

// 設定画面ボタン
document.querySelector('#go-to-options').addEventListener('click', (event) => {

    if (event.target.tagName == "button") {

        if (chrome.runtime.openOptionsPage) {

            chrome.runtime.openOptionsPage();
        }

        else {

            window.open(chrome.runtime.getURL('options.html'));
        }
    }
});
