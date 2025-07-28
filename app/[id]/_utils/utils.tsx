import { MotsAndGroupeMotsFieldsFragment } from "@services/graphql/__generated__/graphql";

const getMotsFromGroupeMots = ({
    allMots,
    groupeMotsId,
}: {
    allMots: MotsAndGroupeMotsFieldsFragment[];
    groupeMotsId: string;
}): MotsAndGroupeMotsFieldsFragment[] => {
    return allMots.filter(mot => parseInt(mot?.groupe?.id ?? '') === parseInt(groupeMotsId));
};

const parseTimelineData = (data: string): { year: string; description: string; isHighlighted: boolean }[] => {
    const lines = data.split('\r\n').filter(line => line.trim() !== '');

    return lines.map(line => {
        const isHighlighted = line.startsWith('>');
        const cleanLine = isHighlighted ? line.substring(1).trim() : line.trim();
        const [year, description] = cleanLine.split(':').map(part => part.trim());
        return { year, description, isHighlighted };
    });
};

const parseChiffresClesData = (data: string): { value: string; description: string; isHighlighted: boolean }[] => {
    const lines = data.split('\r\n').filter(line => line.trim() !== '');

    return lines.map(line => {
        const isHighlighted = line.startsWith('>');
        const cleanLine = isHighlighted ? line.substring(1).trim() : line.trim();

        const firstBlankSpace = cleanLine.indexOf(' ');
        const value = cleanLine.slice(0, firstBlankSpace).trim();
        const description = cleanLine.slice(firstBlankSpace + 1).trim();
        return { value, description, isHighlighted };
    });
};

export {getMotsFromGroupeMots, parseChiffresClesData, parseTimelineData}