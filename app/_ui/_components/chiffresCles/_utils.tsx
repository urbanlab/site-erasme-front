const parseChiffresClesData = (
    data: string,
    splitBy: string,
): { value: string; description: string; isHighlighted: boolean }[] => {
    const lines = data.split('\r\n').filter(line => line.trim() !== '');

    return lines.map(line => {
        const isHighlighted = line.startsWith('>');
        const cleanLine = isHighlighted ? line.substring(1).trim() : line.trim();

        let value: string;
        let description: string;

        if (splitBy === ' ') {
            const firstBlankSpace = cleanLine.indexOf(' ');
            value = cleanLine.slice(0, firstBlankSpace).trim();
            description = cleanLine.slice(firstBlankSpace + 1).trim();
        } else {
            [value, description] = cleanLine.split(splitBy).map(part => part.trim());
        }
        return { value, description, isHighlighted };
    });
};

export { parseChiffresClesData };
