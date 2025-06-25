import { ArticleQuery, MotsAndGroupMotsFromArticleFieldsFragment } from '@graphql/__generated__/graphql';
import RemoteHtml from '@services/remoteHtml';
import styles from './articlePrototype.module.css';
import { DevelopmentAndTimelineSectionsWrapper } from './clientComponents';
// import ImageSlider from '@ui/components/imageSlider';

const prototypeCards = [
    {
        title: 'METHODO',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_METHODOLOGIES_DE_DEVELOPPEMENT_ID ?? '',
    },
    {
        title: 'USAGES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_USAGES_ID ?? '',
    },
    {
        title: 'TECHNO',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_TECHNOLOGIES_ID ?? '',
    },
];
const ecosystemeCards = [
    {
        title: 'PARTENAIRES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '',
    },
    {
        title: 'UTILISATEURS',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_UTILISATEURS_ID ?? '',
    },
    {
        title: 'ENTREPRISES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_ENTREPRISES_ID ?? '',
    },
];

const DescriptionSection = ({ title, content }: { title: string; content: string }) => {
    return (
        <div>
            <h2>{title}</h2>
            <RemoteHtml html={content} />
        </div>
    );
};

const DevelopmentTimeline = ({ timeline }: { timeline: string }) => {
    const parsedTimeline = parseTimelineData(timeline);

    return (
        <ul className={styles.timelineContainer}>
            {parsedTimeline.map((timelineItem, index) => {
                return (
                    <li key={index} className={styles.timelineItem}>
                        <div className={timelineItem.isHighlighted ? styles.highlighted : ''}>
                            <p className={styles.itemYear}>{timelineItem.year}</p>
                            <p className={styles.itemDescription}>{timelineItem.description}</p>
                        </div>
                        <svg
                            className={styles.itemSeparator}
                            width="24"
                            height="80"
                            viewBox="0 0 24 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="10.5" width="3" height="80" fill="black" />
                            <circle cx="12" cy="5" r="5" fill="black" />
                        </svg>
                    </li>
                );
            })}
        </ul>
    );
};

const KeyMetrics = ({ keyMetrics }: { keyMetrics: string }) => {
    const parsedKeyMetrics = parseKeyMetricsData(keyMetrics);
    return (
        <ul className={styles.keyMetricsContainer}>
            <h2>Chiffres clé</h2> {/* TODO: remove magic string */}
            {parsedKeyMetrics.map((keyMetric, index) => {
                return (
                    <li key={index} className={styles.keyMetricItem}>
                        <p className={styles.keyMetricValue}>{keyMetric.value}</p>
                        <p>{keyMetric.description}</p>
                    </li>
                );
            })}
        </ul>
    );
};

const InfoCardWrapper = ({
    data,
    cardsSectionObject,
}: {
    data: ArticleQuery;
    cardsSectionObject: {
        title: string;
        groupeMotsId: string;
    }[];
}) => {
    return (
        <div className={styles.infoCardContainer}>
            {cardsSectionObject.map((card, index) => {
                return (
                    <InfoCard
                        key={index}
                        title={card.title}
                        items={
                            (data?.getArticle?.mots &&
                                getMotsFromGroupeMots({
                                    groupeMotsId: card.groupeMotsId,
                                    allMots: data?.getArticle?.mots,
                                })) ?? ['']
                        }
                    />
                );
            })}
        </div>
    );
};

const InfoCard = ({ title, items }: { title: string; items: string[] }) => {
    return (
        <div className={styles.infoCard}>
            <h4 className={styles.infoCardTitle}>{title}</h4>
            <ul>
                {items.map((item, index) => {
                    return <li key={index}>{item}</li>;
                })}
            </ul>
        </div>
    );
};

const getMotsFromGroupeMots = ({
    allMots,
    groupeMotsId,
}: {
    allMots?: MotsAndGroupMotsFromArticleFieldsFragment;
    groupeMotsId: string;
}): string[] => {
    return (
        allMots?.result
            ?.filter(mot => parseInt(mot?.groupe?.id ?? '') === parseInt(groupeMotsId))
            .map(mot => mot?.titre ?? '') ?? ['']
    );
};

const parseTimelineData = (data: string): { year: string; description: string; isHighlighted: boolean }[] => {
    const lines = data.split('\r\n').filter(line => line.trim() !== '');

    return lines.map(line => {
        const isHighlighted = line.startsWith('>');
        const cleanLine = isHighlighted ? line.substring(1).trim() : line.trim();
        const [description, year] = cleanLine.split(':').map(part => part.trim());
        return { year, description, isHighlighted };
    });
};

const parseKeyMetricsData = (data: string): { value: string; description: string; isHighlighted: boolean }[] => {
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

export default function ArticlePrototype({ data, className }: { data: ArticleQuery; className?: string }) {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            <DescriptionSection
                title={data.getArticle?.description_title ?? ''}
                content={data?.getArticle?.description ?? ''}
            />

            <DevelopmentAndTimelineSectionsWrapper
                developmentSection={
                    <DescriptionSection
                        title={data.getArticle?.description_title_second ?? ''}
                        content={data?.getArticle?.description_second ?? ''}
                    />
                }
                timelineSection={<DevelopmentTimeline timeline={data.getArticle?.developpement ?? ''} />}
            />

            <InfoCardWrapper data={data} cardsSectionObject={prototypeCards} />

            <DescriptionSection
                title={data.getArticle?.description_lateral_title ?? ''}
                content={data?.getArticle?.description_lateral ?? ''}
            />

            {data.getArticle?.chiffres_cles && <KeyMetrics keyMetrics={data.getArticle.chiffres_cles} />}

            {/* <ImageSlider images={data.getArticle?.documents}></ImageSlider> */}

            <InfoCardWrapper data={data} cardsSectionObject={ecosystemeCards} />

            <p></p>
        </div>
    );
}
