"use strict";


// 設定画面の追加が終わってない


// youtubeの動画が再生されてるページにいるかどうか判定
function isVideoPage() {
    if (location.pathname == "/watch") {
        return true;
    } else {
        return false;
    }
}

// 再生速度を変える
function changeVideoSpeed(speed) {

    // video要素代入
    const videoEle = document.querySelector("video");

    // 要素が存在するとき
    if (videoEle) {

        // スピードを変更
        videoEle.playbackRate = speed;

    }

    // 要素が存在しない時
    else {

        setTimeout(changeVideoSpeed, 100, speed);

    }
}

//ページ上のデータセット
function SetData() {

    this.videoID = location.search.substring(3, 14);

    this.currentSpeed = 1.0;

}

// 登録済みかどうか判定
function isResistered(videoID) {

    // クラウドデータ全て取得
    chrome.storage.sync.get(null, (items) => {
        // プロパティの存在判定
        if (items.hasOwnProperty(videoID)) {
            return true;
        }
        else {
            return false;
        }
    })
}

// object生成先
let data = null;

// youtube上でページを遷移したとき
document.addEventListener("yt-navigate-finish", () => {

    // 前のデータを破棄
    data = null;

    // 動画再生ページの時
    if (isVideoPage()) {

        // ページデータ初期化
        data = new SetData();

        // 登録済みならtrue
        // 未登録ならfalse
        const status = isResistered(data.videoID);

        // 登録済みの時
        if (status) {

            // 現在のスピードを更新
            data.currentSpeed = items[data.videoID].speed;

            changeVideoSpeed(data.currentSpeed);
        }
    }
});

// popup.html上のボタンをクリックしたとき
chrome.runtime.onMessage.addListener(

    (message, sender, sendRespons) => {

        // 動画再生ページの時
        if (isVideoPage()) {

            // videoのタイトル
            const videoTitle = document.querySelector("h1.style-scope.ytd-watch-metadata").querySelector("yt-formatted-string").innerHTML;

            // 登録済みならtrue
            // 未登録ならfalse
            const status = isResistered(data.videoID);

            // 記録ボタンのとき
            if (message.action == "memory") {

                // 現在のスピードを更新
                data.currentSpeed = document.querySelector("video").playbackRate;

                // 登録済みの時
                if (status) {

                    // クラウドデータ更新
                    chrome.storage.sync.set({ [data.videoID]: { "videoTitle": videoTitle, "speed": data.currentSpeed } }, () => {

                        const alertMessage = `再生速度-- ${data.currentSpeed} --を更新。`;

                        alert(alertMessage);
                    });
                }

                // 未登録の時
                else {

                    // クラウドデータ新規登録
                    chrome.storage.sync.set({ [data.videoID]: { "videoTitle": videoTitle, "note": "", "speed": data.currentSpeed } }, () => {

                        const alertMessage = `再生速度-- ${data.currentSpeed} --を登録。`;

                        alert(alertMessage);
                    });
                }
            }

            // 削除ボタンのとき
            if (message.action == "delete") {

                // 登録済みの時
                if (status) {

                    // クラウドデータを削除
                    chrome.storage.sync.remove(data.videoID, () => {

                        const alertMessage = `-- ${videoTitle} --の記録を削除。`;

                        alert(alertMessage);
                    });
                }

                // 未登録の時
                else {

                    const alertMessage = "この動画は、まだ登録されていません。";

                    alert(alertMessage);
                }


            }
        }

        // 動画再生ページじゃない時
        else {

            alert("動画が再生されているページで行ってください。");
        }
    }
);
