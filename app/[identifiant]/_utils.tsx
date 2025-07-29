import { MotsAndGroupeMotsFieldsFragment } from '@services/graphql/__generated__/graphql';

const getMotsFromGroupeMots = ({
    allMots,
    groupeMotsId,
}: {
    allMots: MotsAndGroupeMotsFieldsFragment[];
    groupeMotsId: string;
}): MotsAndGroupeMotsFieldsFragment[] => {
    return allMots.filter(mot => parseInt(mot?.groupe?.id ?? '') === parseInt(groupeMotsId));
};

const transformFormerArticleSlugIntoIdentifiant = (input: string): string => {
    return input
        .toLowerCase() // convert to lowercase
        .replace(/-/g, '_') // replace all hyphens with underscores
        .normalize('NFD') // decompose accented letters (e.g., é → e + ́)
        .replace(/[\u0300-\u036f]/g, ''); // remove diacritics
};

export { getMotsFromGroupeMots, transformFormerArticleSlugIntoIdentifiant };
