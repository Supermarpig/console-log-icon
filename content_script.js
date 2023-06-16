// 與 background.js 通信，更新開關狀態
chrome.runtime.sendMessage({ toggleStatus: true }, function(response) {
    // 接收来自 background.js 的响应
  });
  
  // 在 console.log 前添加符號
  console.__log = console.log;
  console.log = function() {
    chrome.runtime.sendMessage({ logArguments: Array.from(arguments) });
  };
  