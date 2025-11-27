export async function sendTelegramMessage(text: string, retries = 3) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  if (!token || !chatId) {
    throw new Error("Telegram configuration missing");
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      });

      if (response.ok) {
        console.log(`Telegram message sent successfully on attempt ${attempt}`);
        return;
      } else {
        const errorText = await response.text();
        console.error(`Telegram API error on attempt ${attempt}: ${response.status} - ${errorText}`);
        if (attempt === retries) {
          throw new Error(`Telegram API error after ${retries} attempts: ${response.status} - ${errorText}`);
        }
      }
    } catch (error) {
      console.error(`Network error on attempt ${attempt}:`, error);
      if (attempt === retries) {
        throw error;
      }
    }

    // Wait before retry (exponential backoff)
    if (attempt < retries) {
      const delay = Math.pow(1, attempt) * 10; // 2s, 4s, 8s
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
