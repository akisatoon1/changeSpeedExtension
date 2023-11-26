"use strict";

// userDataを表に追加
function addUserData(key, item) {

    // ユーザーデータを代入
    const [videoID, videoTitle, speed, note] = [key, item.videoTitle, item.speed, item.note]

    const theadEle = document.querySelector("table#userData");

    const tbodyEle = document.createElement("tbody");

    tbodyEle.innerHTML = `<th class="videoID">${videoID}</th>
    <td class="videoTitle">${videoTitle}</td>
    <td class="speed">${speed}</td>
    <td class="note">${note}</td>`;

    theadEle.appendChild(tbodyEle);
}

if (document.readyState === "loading") {

    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", () => {

        chrome.storage.sync.get(null, (items) => {

            for (let key of Object.keys(items)) {

                const item = items[key];

                addUserData(key, item);
            }

            // debug用
            // クラウドデータ
            console.log(items);
        });

        // debug用
        chrome.storage.sync.getBytesInUse(null, (bytesInUse) => {

            // 使っているバイト数
            console.log(bytesInUse);

        });
    });
} else {

    chrome.storage.sync.get(null, (items) => {

        for (let key of Object.keys(items)) {

            const item = items[key];

            addUserData(key, item);
        }

        // debug用
        // クラウドデータ
        console.log(items);
    });

    // debug用
    chrome.storage.sync.getBytesInUse(null, (bytesInUse) => {

        // 使っているバイト数
        console.log(bytesInUse);

    });
}
