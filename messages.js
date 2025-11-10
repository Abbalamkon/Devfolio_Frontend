// Messages Module

// Load conversations list
async function loadConversations() {
  try {
    const response = await API.getConversations();
    const conversations = response.data;
    renderConversations(conversations);
  } catch (error) {
    console.error("Failed to load conversations:", error);
    document.getElementById("conversationsList").innerHTML =
      '<div class="loading">Failed to load conversations</div>';
  }
}

// Render conversations list
function renderConversations(conversations) {
  const container = document.getElementById("conversationsList");

  if (conversations.length === 0) {
    container.innerHTML =
      '<div class="loading">No conversations yet. Send a message to start chatting!</div>';
    document.getElementById("chatWindow").innerHTML =
      '<div class="loading">Select a conversation or send a message to start chatting.</div>';
    return;
  }

  container.innerHTML = conversations
    .map(
      (conv) => `
    <div class="conversation-item" 
         id="conv-${conv.user.id}" 
         onclick="loadMessages('${conv.user.id}', '${escapeHtml(
        conv.user.name
      )}')">
      <img src="${conv.user.avatar_url || CONFIG.DEFAULT_AVATAR}" 
           alt="${escapeHtml(conv.user.name)}" 
           class="project-card-avatar">
      <div style="flex: 1; min-width: 0;">
        <div class="conversation-username">${escapeHtml(conv.user.name)}</div>
        <div style="font-size: 13px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${conv.last_message.sent_by_me ? "You: " : ""}${escapeHtml(
        conv.last_message.text
      ).substring(0, 30)}${conv.last_message.text.length > 30 ? "..." : ""}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Load messages with a specific user
async function loadMessages(userId, userName) {
  try {
    // Mark conversation as active
    document
      .querySelectorAll(".conversation-item")
      .forEach((item) => item.classList.remove("active"));
    const convElement = document.getElementById(`conv-${userId}`);
    if (convElement) {
      convElement.classList.add("active");
    }

    const response = await API.getMessages(userId);
    const data = response.data;
    renderMessages(data, userId, userName);
  } catch (error) {
    console.error("Failed to load messages:", error);
    document.getElementById("chatWindow").innerHTML =
      '<div class="loading">Failed to load messages</div>';
  }
}

// Render messages in chat window
function renderMessages(data, userId, userName) {
  const chatWindow = document.getElementById("chatWindow");

  chatWindow.innerHTML = `
    <div class="chat-header">${escapeHtml(userName)}</div>
    <div class="chat-messages" id="chatMessages">
      ${
        data.messages.length === 0
          ? '<div class="loading">No messages yet. Start the conversation!</div>'
          : data.messages
              .map(
                (msg) => `
          <div class="message-bubble ${msg.sent_by_me ? "sent" : "received"}">
            ${escapeHtml(msg.message)}
          </div>
        `
              )
              .join("")
      }
    </div>
    <div class="chat-input">
      <form id="replyForm" style="width:100%; display:flex; gap: 10px;">
        <input type="hidden" name="recipient_id" value="${userId}">
        <input type="text" 
               name="message" 
               placeholder="Type a message..." 
               class="form-input" 
               autocomplete="off" 
               required 
               style="flex: 1;">
        <button type="submit" class="btn btn-accent">Send</button>
      </form>
    </div>
  `;

  // Scroll to bottom
  const chatMessagesDiv = document.getElementById("chatMessages");
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

  // Reply form handler
  document.getElementById("replyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipientId = formData.get("recipient_id");
    const message = formData.get("message");

    if (!message.trim()) return;

    try {
      await API.sendMessage(recipientId, message);
      e.target.reset();
      await loadMessages(userId, userName);
    } catch (error) {
      alert("Failed to send message: " + error.message);
    }
  });
}

// Open message modal
function openMessageModal(recipientId, recipientName) {
  STATE.currentRecipientId = recipientId;
  document.getElementById(
    "messageModalTitle"
  ).textContent = `Message ${recipientName}`;
  document
    .getElementById("messageForm")
    .querySelector('[name="recipient_id"]').value = recipientId;
  document
    .getElementById("messageForm")
    .querySelector('[name="message"]').value = "";
  openModal("messageModal");
}

// Send message form handler
document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const recipientId = formData.get("recipient_id");
  const message = formData.get("message");

  if (!message.trim()) {
    alert("Please enter a message");
    return;
  }

  try {
    await API.sendMessage(recipientId, message);
    showSuccess("Message sent successfully!");
    closeModal("messageModal");

    // Navigate to messages page and load the conversation
    showPage("messages");

    // Wait a bit for the UI to update then load the conversation
    setTimeout(async () => {
      await loadConversations();
      // Try to find the user's name from the conversations list
      const response = await API.getConversations();
      const conv = response.data.find((c) => c.user.id === recipientId);
      if (conv) {
        loadMessages(recipientId, conv.user.name);
      }
    }, 500);
  } catch (error) {
    alert("Failed to send message: " + error.message);
  }
});
