document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.getElementById("toggleSwitch");
  
  // 從儲存中獲取開關狀態並更新UI
  chrome.storage.local.get("toggleStatus", function(result) {
    const status = result.toggleStatus === undefined ? true : result.toggleStatus;
    toggleSwitch.checked = status;
  });
  
  
  // 經天開關狀態改變事件
  toggleSwitch.addEventListener("change", function(event) {
    const status = event.target.checked;
    
    // 將開關狀態儲存到儲存中
    chrome.storage.local.set({ toggleStatus: status }, function() {
      console.log("Toggle status set to: " + status);
    
      // 發送消息給 background.js，通知開關狀態的改變
      chrome.runtime.sendMessage({ toggleStatus: status });
    });
  });
});
