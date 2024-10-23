document.getElementById("send-button").addEventListener("click", () => {
    sendMessage();
});

document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput) {
        displayMessage(userInput, "user");
        fetchBotResponse(userInput);
        document.getElementById("user-input").value = "";
    }
}

function displayMessage(message, sender) {
    const chatArea = document.getElementById("chat-area");
    const messageElem = document.createElement("div");
    messageElem.className = sender === "user" ? "user-message" : "bot-message";
    messageElem.textContent = message;
    chatArea.appendChild(messageElem);
    chatArea.scrollTop = chatArea.scrollHeight;
}

async function fetchBotResponse(userMessage) {
    try {
        // Replace with the actual API endpoint for your chatbot
        const response = await fetch('https://chatgpt.com/g/g-Y9jYpxYiJ-levonne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        displayMessage(data.response || "Sorry, I couldn't get a response.", "bot");
    } catch (error) {
        console.error('Error:', error);
        displayMessage("Error connecting to the chatbot. Please try again later.", "bot");
    }
}
