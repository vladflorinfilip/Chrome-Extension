chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Specify the module type for your background script
    if (message.action == 'fetchData'){

        // Fetch and pass the apis 
        fetch(chrome.runtime.getURL('config.json'))
        .then(response_config => response_config.json()).then(jsonData => {
            const outstandingAPI = jsonData.apis[0];
            const completedAPI = jsonData.apis[1];
            // Make an API request to the URL of the active tab (if applicable)
            fetch(outstandingAPI)
            .then(response => response.json()).then(data => {
                fetch(completedAPI)
                    .then(response_c => response_c.json()).then(data_c => {
                        sendResponse({success: true, outstanding: data, completed: data_c});
                })
        })
        .catch(error => {
            console.error('Fetch error: ', error);
            sendResponse({ success: false});
        });
        })
        // Return true to indicate that the response will be sent asynchronously
        return true;
    } else if (message.action === 'refreshTabAndPopup') {
        // Refresh the current tab
        chrome.tabs.query({}, (tabs) => {
            fetch(chrome.runtime.getURL('config.json'))
            .then(response_config => response_config.json()).then(jsonData => {
                let targetTab = tabs.find(tab => tab.url === jsonData.url);
                if (targetTab) {
                    chrome.tabs.reload(targetTab.id, {}, () => {
                        // Once the tab is reloaded, send a message back to sender (popup) to refresh itself
                        sendResponse({ status: "Tab reloaded" });
                    });
                } else {
                    console.error(`Tab with URL ${jsonData.url} not found.`);
                    sendResponse({ status: "Tab not found" });
                }
            })
        });
        return true; // Keeps the message channel open for sendResponse
    }
});