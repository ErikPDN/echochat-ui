export const getTimeString = (date: Date): string => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatMessageDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  }

  if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  const diffTime = today.getTime() - messageDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (diffDays < 7) {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekDays[messageDate.getDay()];
  }

  return messageDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
