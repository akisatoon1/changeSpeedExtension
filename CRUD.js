function removeData(videoID) {

    chrome.storage.sync.remove(videoID, () => {

        if (confirm(`ID: ${videoID} を削除してよろしいですか？`)) {

            alert(`ID: ${videoID} の動画の記録を削除しました。`);

            location.href = "options.html";
        } else {

            alert("キャンセルしました。");
        }
    });
}

document.addEventListener("click", (event) => {

    //htmlの時は大文字になる
    if (event.target.tagName == "BUTTON") {

        const videoID = event.target.dataset.videoid;

        removeData(videoID);
    }
});