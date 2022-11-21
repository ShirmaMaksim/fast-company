export function displayDate(date) {
    const commentDate = new Date(Number(date));
    const currentDate = new Date(Date.now());
    if (currentDate.getFullYear() === commentDate.getFullYear()) {
        if (currentDate.getDate() === commentDate.getDate()) {
            if (currentDate.getHours() === commentDate.getHours()) {
                const minutesDif = currentDate.getMinutes() - commentDate.getMinutes();
                if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
                if (minutesDif >= 10 && minutesDif < 30) return "10 минут назад";
                return "30 минут назад";
            }
            return `${commentDate.getHours()}:${commentDate.getMinutes()}`;
        }
        return commentDate.toLocaleString("ru", { month: "long", day: "numeric" });
    }
    return `${commentDate.getDate()}.${commentDate.getMonth()}.${commentDate.getFullYear()}`;
};
