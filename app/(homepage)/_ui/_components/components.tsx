import {
    ArticleBasicInformationFieldsFragment,
    ArticleFullInformationFieldsFragment,
} from '@services/graphql/__generated__/graphql';
import cubeShapedIcon from '@public/cube-shaped-icon.svg';
import doubleArrowShapedIcon from '@public/double-arrow-shaped-icon.svg';
import heroImage from '@public/hero-img.svg';
import xShapedIcon from '@public/x-shaped-icon.svg';
import ArticleCard from '@ui/components/articleCard';
import ImageCard from '@ui/components/imageCard';
import ShapedImage from '@ui/components/shapedImage';
import LinkButton from '@ui/elements/linkButton';
import Image from 'next/image';
import { imageCardsContent, pageTexts } from '../../_data/pageTexts';
import { ArchiveArticleCard } from '../_client-components/client-components';
import styles from './components.module.css';

const MissionsSection = () => {
    return (
        <div className={styles.missionContainer}>
            <h2 className={styles.title}>{pageTexts.missionSection.title}</h2>
            <p className={styles.description}>{pageTexts.missionSection.description}</p>
            <Image alt="" src={doubleArrowShapedIcon} className={`${styles.desktopDisplayOnly} ${styles.icon}`} />
        </div>
    );
};

const PresentationSection = () => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={heroImage} alt="" maskShape="wide" className={styles.presentationImage} />
            <div className={styles.presentationTextContainer}>
                <h1>{pageTexts.presentationSection.title}</h1>
                <h5>{pageTexts.presentationSection.description}</h5>
            </div>
        </div>
    );
};

const EnCeMomentSection = ({
    articles,
    archiveArticleIdList,
}: {
    articles: ArticleFullInformationFieldsFragment[];
    archiveArticleIdList: string[];
}) => {
    const textLength: number = 130;

    return (
        <div className={styles.currentTopicsContainer}>
            <h2>{pageTexts.currentTopicsSection.title}</h2>
            <div className={styles.cardsContainer}>
                <div className={styles.spotlightCardsContainer}>
                    {articles.map(article => (
                        <ArticleCard
                            article={article}
                            variant="spotlight"
                            className={styles.cardSizing}
                            textLength={textLength}
                            key={article.id}
                        />
                    ))}
                </div>
                <ArchiveArticleCard articleIdList={archiveArticleIdList} textLength={textLength} />
            </div>
        </div>
    );
};

const ProgrammesSection = () => {
    return (
        <div className={styles.programsContainer}>
            <h2>{pageTexts.ProgramsSection.title}</h2>
            <div className={styles.imageCardsContainer}>
                {imageCardsContent.map((card, index) => (
                    <ImageCard
                        className={styles.imageCard}
                        title={card.title}
                        image={card.image.src}
                        link={card.link}
                        isInternalLink={card.isInternalLink}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

const ServicesSection = ({ articles }: { articles: ArticleBasicInformationFieldsFragment[] }) => {
    return (
        <div className={styles.servicesContainer}>
            <h2>{pageTexts.servicesSection.title}</h2>
            <div className={styles.tagIconWrapper}>
                <Image src={xShapedIcon} alt="" className={`${styles.desktopDisplayOnly} ${styles.firstIcon}`} />
                <div className={styles.tagsContainer}>
                    {articles.map(article => (
                        <LinkButton
                            key={article.id}
                            href={`/services#${article.titre}`}
                            variant="ghost"
                            className={styles.serviceTag}
                        >
                            {article.titre}
                        </LinkButton>
                    ))}
                </div>
                <Image src={cubeShapedIcon} alt="" className={`${styles.desktopDisplayOnly} ${styles.secondIcon}`} />
            </div>
        </div>
    );
};

export { EnCeMomentSection, MissionsSection, PresentationSection, ProgrammesSection, ServicesSection };
