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

    // htmlの時は大文字になる
    if (event.target.tagName == "BUTTON") {

        sendMessage("memory");

    }
});

// 記録削除ボタン
document.querySelector("#delete").addEventListener("click", (event) => {

    // htmlの時は大文字になる
    if (event.target.tagName == "BUTTON") {

        sendMessage("delete");
    }
});

// 設定画面ボタン
document.querySelector('#go-to-options').addEventListener('click', (event) => {

    // htmlの時は大文字になる
    if (event.target.tagName == "BUTTON") {

        if (chrome.runtime.openOptionsPage) {

            chrome.runtime.openOptionsPage();
        }

        else {

            window.open(chrome.runtime.getURL('options.html'));
        }
    }
});
