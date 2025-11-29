import { sendTelegramMessageToChat } from "./telegram";
import { Notification } from "@/types/notification";

export async function triggerNotification(
  eventTrigger: string,
  message: string,
  notifications: Notification[]
) {
  console.log(`Processing ${notifications.length} notifications for event: ${eventTrigger}`);
  console.log(`TELEGRAM_BOT_TOKEN available: ${!!process.env.TELEGRAM_BOT_TOKEN}`);
  console.log(`TELEGRAM_CHAT_ID: ${process.env.TELEGRAM_CHAT_ID}`);

  const activeNotifications = notifications.filter(
    (n) => n.isActive && n.eventTrigger === eventTrigger && n.type === "telegram"
  );

  console.log(`Found ${activeNotifications.length} active Telegram notifications for ${eventTrigger}`);
  console.log("Active notifications:", activeNotifications.map(n => ({ name: n.name, trigger: n.eventTrigger, active: n.isActive })));

  for (const notification of activeNotifications) {
    try {
      const fullMessage = `🚨 ${notification.name}\n${message}\n\nTriggered by: ${eventTrigger}`;

      // Use the configured recipient, or fallback to default chat ID
      const chatId = notification.recipient || process.env.TELEGRAM_CHAT_ID;
      console.log(`Using chat ID: ${chatId} for notification: ${notification.name}`);

      if (!chatId) {
        console.error("No chat ID configured for notification:", notification.name);
        continue;
      }

      await sendTelegramMessageToChat(fullMessage, chatId);

      console.log(`Notification sent to ${chatId} for event: ${eventTrigger}`);
    } catch (error) {
      console.error(`Failed to send notification to ${notification.recipient || 'default chat'}:`, error);
    }
  }
}

// Event constants
export const NOTIFICATION_EVENTS = {
  USER_ADDED: 'user_added',
  GROUP_ADDED: 'group_added',
  GROUP_UPDATED: 'group_updated',
  GROUP_DELETED: 'group_deleted',
  CPU_HIGH: 'cpu_usage > 80%',
  CPU_CRITICAL: 'cpu_usage > 90%',
  DISK_HIGH: 'disk_usage > 80%',
  DISK_CRITICAL: 'disk_usage > 90%',
  RAM_HIGH: 'ram_usage > 85%',
  SERVER_OFFLINE: 'server_offline',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
} as const;