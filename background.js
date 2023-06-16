const storage = chrome.storage.local;
let toggleStatus = true;

// 初始畫開關狀態
chrome.runtime.onInstalled.addListener(function() {
  storage.set({ toggleStatus: true });
});

// 監聽来自 popup.js 的消息，更新開關狀態
chrome.runtime.onMessage.addListener(function(request) {
  if (request.toggleStatus !== undefined) {
    toggleStatus = request.toggleStatus;
  }
});

// 在 console.log 前添加 🐷🐷🐷 符號
console.__log = console.log;
console.log = function() {
  if (toggleStatus) {
    const args = Array.from(arguments);
    args[0] = "🐷🐷🐷 " + args[0];
    console.__log.apply(console, args);
  }
};

// 監聽来自 content_script.js 的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggleStatus !== undefined) {
    toggleStatus = request.toggleStatus;
  }
  if (request.logArguments !== undefined && toggleStatus) {
    const args = Array.from(request.logArguments);
    args[0] = "🐷🐷🐷 " + args[0];
    console.__log.apply(console, args);
  }
});
