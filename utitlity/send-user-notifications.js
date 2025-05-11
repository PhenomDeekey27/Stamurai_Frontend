import api from "@/lib/api";

export async function sendNotifications(userId, message) {
  try {
    const notificationUsers = await api.post(
      "/notifications/sendNotifications",
      {
        userId,
        message,
      }
    );

    return notificationUsers.data;
  } catch (error) {
    return error ? error : error.message;
  }
}
