import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import {
    AuteurBasicInformationFieldsFragment,
    MotsAndGroupeMotsFieldsFragment,
    MotsAndGroupeMotsFieldsFragmentDoc,
} from '@services/graphql/__generated__/graphql';
import LinkButton from '@ui/components/linkButton';
import Link from 'next/link';
import { pageTexts } from '../../_data/page-texts';
import styles from './components.module.css';

const CollaborateursSection = async ({
    activeAuteurs,
    className,
}: {
    activeAuteurs: AuteurBasicInformationFieldsFragment[];
    className?: string;
}) => {
    return (
        <div className={`${className} ${styles.sectionContainer}`}>
            <h2 className={styles.alignLineHeight}>{pageTexts.teamSection}</h2>
            <div className={styles.tagsContainer}>
                {activeAuteurs.map(auteur => {
                    return (
                        <LinkButton href={`/equipe/${auteur?.id}`} variant="ghost" key={auteur?.id}>
                            {auteur?.titre}
                        </LinkButton>
                    );
                })}
            </div>
        </div>
    );
};

const PartenairesSection = async ({
    partenaires,
    className,
}: {
    partenaires: MotsAndGroupeMotsFieldsFragment[];
    className?: string;
}) => {
    const sortedPartenaires = partenaires.slice().sort((a, b) => a.titre?.localeCompare(b.titre ?? '') ?? -1);

    return (
        <div className={`${className} ${styles.sectionContainer}`}>
            <h2 className={styles.alignLineHeight}>{pageTexts.partnersSection}</h2>
            <div className={styles.tagsContainer}>
                {sortedPartenaires.map(mot => {
                    const motFragment = getFragmentData(
                        MotsAndGroupeMotsFieldsFragmentDoc,
                        mot as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>
                    );

                    return (
                        <Link
                            key={motFragment.id}
                            href={`/mot-cle/${motFragment.identifiant}`}
                            className={styles.linkStyle}
                        >
                            {motFragment.titre}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export { CollaborateursSection, PartenairesSection };
