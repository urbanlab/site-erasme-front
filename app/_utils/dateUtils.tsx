const dateFormat = (dateTime: string): string => {
    const [datePart] = dateTime.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
};

export { dateFormat };
