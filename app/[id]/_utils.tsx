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

export { getMotsFromGroupeMots };
