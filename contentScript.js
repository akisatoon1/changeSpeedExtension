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

        // クラウドデータを取得する
        chrome.storage.sync.get(null, (items) => {

            // 登録済みの時
            if (items.hasOwnProperty(data.videoID)) {

                // 現在のスピードを更新
                data.currentSpeed = items[data.videoID].speed;

                changeVideoSpeed(data.currentSpeed);

            }
        })
    }
});

// popup.html上のボタンをクリックしたとき
chrome.runtime.onMessage.addListener(

    (message, sender, sendRespons) => {

        // 動画再生ページの時
        if (isVideoPage()) {

            const videoTitle = document.querySelector("h1.style-scope.ytd-watch-metadata").querySelector("yt-formatted-string").innerHTML;

            // 記録ボタンのとき
            if (message.action == "memory") {

                // 現在のスピードを更新
                data.currentSpeed = document.querySelector("video").playbackRate;

                // クラウドデータを取得
                chrome.storage.sync.get(null, (items) => {

                    //  登録済みの時
                    if (items.hasOwnProperty(data.videoID)) {

                        chrome.storage.sync.set({ [data.videoID]: { "videoTitle": videoTitle, "speed": data.currentSpeed } }, () => {

                            const alertMessage = `再生速度-- ${data.currentSpeed} --を更新。`;

                            alert(alertMessage);
                        });
                    }

                    // 未登録の時
                    else {

                        chrome.storage.sync.set({ [data.videoID]: { "videoTitle": videoTitle, "note": "", "speed": data.currentSpeed } }, () => {

                            const alertMessage = `再生速度-- ${data.currentSpeed} --を登録。`;

                            alert(alertMessage);
                        });
                    }
                });
            }

            // 削除ボタンのとき
            if (message.action == "delete") {

                // クラウドデータを削除
                chrome.storage.sync.remove(data.videoID, () => {

                    const alertMessage = `-- ${videoTitle} --の記録を削除。`;

                    alert(alertMessage);

                });
            }
        }

        // 動画再生ページじゃない時
        else {

            alert("動画が再生されているページで行ってください。");

        }
    }
);