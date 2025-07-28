import { getPageArticleOrPrototype } from '@data/queries';
import ToTopButton from '@ui/elements/toTopButton';
import ArticleCommon from './_ui/_client-components/client-components';
import { ArticlePresentation, ArticlePrototype } from './_ui/_components/components';
import styles from './page.module.css';

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { articleFields, prototypeFields, auteurs, motsAndGroupeMots, rubriqueParentLogo } =
        await getPageArticleOrPrototype(parseInt(id));

    const isPrototype: boolean = articleFields.isprototype === '1';

    return (
        <>
            <div className={`${styles.mainContainer} ${styles.localVariables}`}>
                <ArticlePresentation
                    articleInformation={articleFields}
                    logoRubriqueParent={rubriqueParentLogo}
                    isPrototype={isPrototype}
                    authors={auteurs}
                />

                <div className={styles.contentContainer}>
                    {isPrototype ? (
                        <ArticlePrototype
                            prototypeInformation={prototypeFields}
                            motsAndGroupeMots={motsAndGroupeMots}
                        />
                    ) : (
                        <ArticleCommon articleInformation={articleFields} />
                    )}
                </div>
                <ToTopButton className={styles.toTopButton} />
            </div>
        </>
    );
}
