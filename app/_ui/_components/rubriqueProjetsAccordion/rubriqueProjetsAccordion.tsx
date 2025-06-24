import { Accordion } from '@base-ui-components/react/accordion';
import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ArticleInformationFieldsFragmentDoc,
    ListProjetsFieldsFragment
} from '@graphql/__generated__/graphql';
import RemoteHtml from '@services/remoteHtml';
import ArticleList from '@ui/components/articleList';
import Arrow from '@ui/elements/arrow';
import styles from './rubriqueProjetsAccordion.module.css';

export default function RubriqueProjetsAccordion({ projets }: { projets: ListProjetsFieldsFragment[] }) {
    return (
        <Accordion.Root className={`${styles.accordion} ${styles.localVariables}`}>
            {projets?.map((rubrique, index) => {
                const articlesFragment = getFragmentData(
                    ArticleInformationFieldsFragmentDoc,
                    rubrique.articles?.result as FragmentType<typeof ArticleInformationFieldsFragmentDoc>[]
                );

                return (
                    <Accordion.Item key={index} className={styles.item}>
                        <Accordion.Trigger className={styles.trigger}>
                            <div className={styles.title}>{rubrique?.titre}</div>
                            <div className={`${styles.conditionalDisplay} ${styles.desktopFields}`}>
                                <Arrow className={styles.arrow} orientation="northeast" size={28} />
                            </div>
                        </Accordion.Trigger>
                        <Accordion.Panel className={styles.panel}>
                            {rubrique?.texte && <RemoteHtml html={rubrique.texte} />}
                            <ArticleList articles={articlesFragment} />
                        </Accordion.Panel>
                    </Accordion.Item>
                );
            })}
        </Accordion.Root>
    );
}
