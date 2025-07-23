import { Accordion } from '@base-ui-components/react/accordion';
import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import { ArticleBasicInformationFieldsFragmentDoc, ListProjetsFieldsFragment } from '@graphql/__generated__/graphql';
import { RemoteHtml } from '@services/remoteHtml';
import ArticleList from '@ui/components/articleList';
import Arrow from '@ui/elements/arrow';
import styles from './rubriqueProjetsAccordion.module.css';
import chevronIcon from '@public/chevron-up-icon.svg';
import Image from 'next/image';

export default function RubriqueProjetsAccordion({
    projets,
    handleNavigation,
    className,
}: {
    projets: ListProjetsFieldsFragment[];
    handleNavigation?: () => void;
    className?: string;
}) {
    return (
        <Accordion.Root className={`${styles.accordion} ${styles.localVariables} ${className}`}>
            {projets?.map(rubrique => {
                const articlesFragment = getFragmentData(
                    ArticleBasicInformationFieldsFragmentDoc,
                    rubrique.articles?.result as FragmentType<typeof ArticleBasicInformationFieldsFragmentDoc>[]
                );

                return (
                    <Accordion.Item key={rubrique.id} className={styles.item}>
                        <Accordion.Trigger className={styles.trigger}>
                            <div className={styles.title}>{rubrique?.titre}</div>
                            <Image src={chevronIcon} alt="" className={styles.arrow} />
                        </Accordion.Trigger>
                        <Accordion.Panel className={styles.panel}>
                            {rubrique?.texte && <RemoteHtml html={rubrique.texte} />}
                            <ArticleList articles={articlesFragment} handleNavigation={handleNavigation} />
                        </Accordion.Panel>
                    </Accordion.Item>
                );
            })}
        </Accordion.Root>
    );
}
