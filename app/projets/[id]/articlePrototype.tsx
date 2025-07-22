import { FragmentType, getFragmentData } from '@graphql/__generated__';
import {
    DocumentFullInformationFieldsFragmentDoc,
    MotsAndGroupeMotsFieldsFragment,
    PrototypeInformationFieldsFragment,
} from '@graphql/__generated__/graphql';
import { RemoteHtml } from '@services/remoteHtml';
import Carousel from '@ui/elements/carousel';
import Link from 'next/link';
import styles from './articlePrototype.module.css';
import { DevelopmentAndTimelineSectionsWrapper } from './clientComponents';

const prototypeCards = [
    {
        title: 'METHODO',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_METHODOLOGIES_DE_DEVELOPPEMENT_ID ?? '',
        hasLink: false,
    },
    {
        title: 'USAGES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_USAGES_ID ?? '',
        hasLink: false,
    },
    {
        title: 'TECHNO',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_TECHNOLOGIES_ID ?? '',
        hasLink: false,
    },
];
const ecosystemeCards = [
    {
        title: 'PARTENAIRES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_PARTENAIRES_ID ?? '',
        hasLink: true,
    },
    {
        title: 'UTILISATEURS',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_UTILISATEURS_ID ?? '',
        hasLink: false,
    },
    {
        title: 'ENTREPRISES',
        groupeMotsId: process.env.SPIP_GROUPE_MOTS_ENTREPRISES_ID ?? '',
        hasLink: false,
    },
];

const DescriptionSection = ({ title, content }: { title: string; content: string }) => {
    return (
        <div>
            <h2>{title}</h2>
            <>
                <RemoteHtml html={content} />
            </>
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
    motsAndGroupeMots,
    cardsSectionObject,
}: {
    motsAndGroupeMots: MotsAndGroupeMotsFieldsFragment[];
    cardsSectionObject: {
        title: string;
        groupeMotsId: string;
        hasLink: boolean;
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
                            (motsAndGroupeMots && {
                                mots: getMotsFromGroupeMots({
                                    groupeMotsId: card.groupeMotsId,
                                    allMots: motsAndGroupeMots,
                                }),
                                hasLink: card.hasLink,
                            }) ?? ['']
                        }
                    />
                );
            })}
        </div>
    );
};

const InfoCard = ({
    title,
    items,
}: {
    title: string;
    items: { mots: MotsAndGroupeMotsFieldsFragment[]; hasLink: boolean };
}) => {
    return (
        <div className={styles.infoCard}>
            <h4 className={styles.infoCardTitle}>{title}</h4>
            <ul>
                {items.mots.map(mot => {
                    return items.hasLink ? (
                        <li key={mot.id}>
                            <Link key={mot.id} href={`/mot-cle/${mot.id}`} className={styles.linkStyle}>
                                {mot.titre}
                            </Link>
                        </li>
                    ) : (
                        <li key={mot.id}>{mot.titre}</li>
                    );
                })}
            </ul>
        </div>
    );
};

const DescriptifTechniqueSection = ({
    typeTechnique,
    devices,
    framework,
    depot,
    licence,
}: {
    typeTechnique: string;
    devices: string;
    framework: string;
    depot: string;
    licence: string;
}) => {
    return (
        <div className={styles.desciptifTechniqueContainer}>
            <h2>Descriptif technique</h2>
            <ul>
                {typeTechnique && (
                    <li>
                        <b>Type technique : </b>
                        {typeTechnique}
                    </li>
                )}
                {devices && (
                    <li>
                        <b>Devices / Compatibilité :</b>
                        {devices}
                    </li>
                )}
                {framework && (
                    <li>
                        <b>Framework : </b>
                        {framework}
                    </li>
                )}
                {depot && (
                    <li>
                        <b>Dépot : </b>
                        {depot}
                    </li>
                )}
                {licence && (
                    <li>
                        <b>Licence : </b>
                        {licence}
                    </li>
                )}
            </ul>
        </div>
    );
};

const getMotsFromGroupeMots = ({
    allMots,
    groupeMotsId,
}: {
    allMots: MotsAndGroupeMotsFieldsFragment[];
    groupeMotsId: string;
}): MotsAndGroupeMotsFieldsFragment[] => {
    return allMots.filter(mot => parseInt(mot?.groupe?.id ?? '') === parseInt(groupeMotsId));
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

export default function ArticlePrototype({
    prototypeInformation,
    motsAndGroupeMots,
    className,
}: {
    prototypeInformation: PrototypeInformationFieldsFragment;
    motsAndGroupeMots: MotsAndGroupeMotsFieldsFragment[];
    className?: string;
}) {
    const imagesFromPrototype = getFragmentData(
        DocumentFullInformationFieldsFragmentDoc,
        prototypeInformation?.documents?.result as FragmentType<typeof DocumentFullInformationFieldsFragmentDoc>[]
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            <DescriptionSection
                title={prototypeInformation.description_title ?? ''}
                content={prototypeInformation.description ?? ''}
            />

            <DevelopmentAndTimelineSectionsWrapper
                developmentSection={
                    <DescriptionSection
                        title={prototypeInformation.description_title_second ?? ''}
                        content={prototypeInformation.description_second ?? ''}
                    />
                }
                timelineSection={<DevelopmentTimeline timeline={prototypeInformation.developpement ?? ''} />}
            />

            <InfoCardWrapper motsAndGroupeMots={motsAndGroupeMots} cardsSectionObject={prototypeCards} />

            <DescriptionSection
                title={prototypeInformation.description_lateral_title ?? ''}
                content={prototypeInformation.description_lateral ?? ''}
            />

            <div className={styles.twoColumnsContainerWrapper}>
                {prototypeInformation.chiffres_cles && <KeyMetrics keyMetrics={prototypeInformation.chiffres_cles} />}

                {imagesFromPrototype.length > 0 && <Carousel images={imagesFromPrototype} />}
            </div>

            <InfoCardWrapper motsAndGroupeMots={motsAndGroupeMots} cardsSectionObject={ecosystemeCards} />

            {prototypeInformation.description_title_third && (
                <DescriptionSection
                    title={prototypeInformation.description_title_third ?? ''}
                    content={prototypeInformation.description_third ?? ''}
                />
            )}

            {(prototypeInformation.descr_tech_technique ||
                prototypeInformation.descr_tech_devices ||
                prototypeInformation.descr_tech_framework ||
                prototypeInformation.descr_tech_depot ||
                prototypeInformation.descr_tech_licence) && (
                <DescriptifTechniqueSection
                    typeTechnique={prototypeInformation.descr_tech_technique ?? ''}
                    devices={prototypeInformation.descr_tech_devices ?? ''}
                    framework={prototypeInformation.descr_tech_framework ?? ''}
                    depot={prototypeInformation.descr_tech_depot ?? ''}
                    licence={prototypeInformation.descr_tech_licence ?? ''}
                />
            )}
        </div>
    );
}
