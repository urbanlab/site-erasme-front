import { getPageArticleOrPrototypeByIdentifiant } from '@data/queries';
import ToTopButton from '@ui/components/toTopButton';
import { notFound, redirect, RedirectType } from 'next/navigation';
import ArticleCommon from './_ui/_client-components/client-components';
import { ArticlePresentation, ArticlePrototype } from './_ui/_components/components';
import { transformFormerArticleSlugIntoIdentifiant } from './_utils';
import styles from './page.module.css';

export default async function Article({ params }: { params: Promise<{ identifiant: string }> }) {
    const { identifiant } = await params;

    try {
        const { articleFields, prototypeFields, auteurs, motsAndGroupeMots, rubriqueParentLogo } =
            await getPageArticleOrPrototypeByIdentifiant(identifiant);

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
    } catch (error) {
        /**
         * This workaround was created to deal with the url pattern used
         * by the old Erasme website (from SPIP). The old slug was the title
         * of the article, divided by `-` separator. There could also be
         * capital letters in it.
         *
         * Here, we transform the incoming parameter into the current (valid)
         * identifiant format and retry.
         *
         * If the transformed param is the same as the incoming param,
         * this means that we have already tried to redirect and it failed,
         * meaning that this route doesn't exist at all. Shows `Not Found`
         * page in the case.
         */
        const transformedParam = transformFormerArticleSlugIntoIdentifiant(identifiant);

        if (identifiant === transformedParam) {
            notFound();
        } else {
            redirect(`/${transformedParam}`, RedirectType.replace);
        }
    }
}
