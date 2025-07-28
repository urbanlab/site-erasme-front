const parseTimelineData = (data: string): { year: string; description: string; isHighlighted: boolean }[] => {
    const lines = data.split('\r\n').filter(line => line.trim() !== '');

    return lines.map(line => {
        const isHighlighted = line.startsWith('>');
        const cleanLine = isHighlighted ? line.substring(1).trim() : line.trim();
        const [year, description] = cleanLine.split(':').map(part => part.trim());
        return { year, description, isHighlighted };
    });
};

export { parseTimelineData };
