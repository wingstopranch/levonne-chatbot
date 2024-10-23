document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatArea = document.getElementById('chat-area');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessageToChat(message, 'user-message');
            userInput.value = '';
            getBotResponse(message);
        }
    }

    function addMessageToChat(message, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
        messageElement.textContent = message;
        chatArea.appendChild(messageElement);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function getBotResponse(userMessage) {
        // Replace with actual call to AI chatbot API using your provided link
        fetch(`https://chatgpt.com/g/g-Y9jYpxYiJ-levonne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = data.response || "Sorry, I couldn't get a response.";
            addMessageToChat(botMessage, 'bot-message');
        })
        .catch(error => {
            console.error('Error:', error);
            addMessageToChat("Error connecting to chatbot.", 'bot-message');
        });
    }
});
