import { Accordion } from '@base-ui-components/react/accordion';
import { ListProjetsQuery } from '@graphql/__generated__/graphql';
import Arrow from '@ui/elements/arrow';
import Tag from '@ui/elements/tag';
import styles from './rubriqueProjetsAccordion.module.css';

export default function RubriqueProjetsAccordion({ rubriques }: ListProjetsQuery) {
    return (
        <Accordion.Root className={`${styles.accordion} ${styles.localVariables}`}>
            {rubriques?.result?.map((rubrique, index) => {
                return (
                    <Accordion.Item key={index} className={styles.item}>
                        <Accordion.Trigger className={styles.trigger}>
                            <div className={styles.title}>{rubrique?.titre}</div>
                            <div className={`${styles.conditionalDisplay} ${styles.desktopFields}`}>
                                {/* TODO: update tag value */}
                                <Tag className={styles.tag} value={'project'} />
                                <Arrow className={styles.arrow} orientation="northeast" size={28} />
                            </div>
                        </Accordion.Trigger>
                        <Accordion.Panel className={styles.panel}>
                            {/* TODO: create ArticleList componenent and use it here */}
                        </Accordion.Panel>
                    </Accordion.Item>
                );
            })}
        </Accordion.Root>
    );
}

