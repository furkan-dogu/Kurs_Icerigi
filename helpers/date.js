export const getFormattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const getLastWeek = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}