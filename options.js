
chrome.storage.sync.get(null, (items) => {
    for (key of Object.keys(items)) {

    }
    let ele = document.createElement("div");
    ele.innerHTML = "test"
    // debug用
    // クラウドデータ
    console.log(items);

});

// debug用
chrome.storage.sync.getBytesInUse(null, (bytesInUse) => {

    // 使っているバイト数
    console.log(bytesInUse);

});
