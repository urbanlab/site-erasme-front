import { FragmentType, getFragmentData } from '@services/graphql/__generated__';
import {
    ArticleFullInformationFieldsFragment,
    AuteurBasicInformationFieldsFragment,
    DocumentFullInformationFieldsFragmentDoc,
    MotsAndGroupeMotsFieldsFragment,
    PrototypeInformationFieldsFragment,
} from '@services/graphql/__generated__/graphql';
import { RemoteHtml } from '@services/remoteHtml';
import Carousel from '@ui/client-components/carousel';
import { ChiffresCles } from '@ui/components/chiffresCles';
import ShapedImage from '@ui/components/shapedImage';
import Tag from '@ui/components/tag';
import { Timeline } from '@ui/components/timeline';
import { dateFormat } from '@utils';
import Link from 'next/link';
import { ecosystemeCards, prototypeCards } from '../../_data/pageTexts';
import { getMotsFromGroupeMots } from '../../_utils';
import { DevelopmentAndTimelineSectionsWrapper } from '../_client-components/client-components';
import styles from './components.module.css';

const ArticlePresentation = ({
    articleInformation,
    logoRubriqueParent,
    authors,
    isPrototype,
}: {
    articleInformation: ArticleFullInformationFieldsFragment;
    authors: AuteurBasicInformationFieldsFragment[];
    isPrototype: boolean;
    logoRubriqueParent: string | null | undefined;
}) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={articleInformation.logo ?? logoRubriqueParent ?? ''}
                alt="logo de l'article"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{articleInformation.titre}</h1>
            <Tag value={isPrototype ? 'prototype' : 'article'} className={styles.tag} />
            <p className={styles.date}>{dateFormat(articleInformation.date)}</p>
            <ul className={styles.authors}>
                {authors && authors.length > 0 && <li>Par :</li>}
                {authors?.map(author => {
                    return (
                        <li key={author?.id} className={styles.linkStyle}>
                            <Link href={`/equipe/${author?.id}`}>{author?.titre}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const ArticlePrototype = ({
    prototypeInformation,
    motsAndGroupeMots,
    className,
}: {
    prototypeInformation: PrototypeInformationFieldsFragment;
    motsAndGroupeMots: MotsAndGroupeMotsFieldsFragment[];
    className?: string;
}) => {
    const imagesFromPrototype = getFragmentData(
        DocumentFullInformationFieldsFragmentDoc,
        prototypeInformation?.documents?.result as FragmentType<typeof DocumentFullInformationFieldsFragmentDoc>[]
    );

    return (
        <div className={`${styles.prototypeContainer} ${styles.localVariables} ${className}`}>
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
                timelineSection={<Timeline timeline={prototypeInformation.developpement ?? ''} />}
            />

            <InfoCardWrapper motsAndGroupeMots={motsAndGroupeMots} cardsSectionObject={prototypeCards} />

            <DescriptionSection
                title={prototypeInformation.description_lateral_title ?? ''}
                content={prototypeInformation.description_lateral ?? ''}
            />

            <div className={styles.twoColumnsContainerWrapper}>
                {prototypeInformation.chiffres_cles && (
                    <ChiffresCles title="Chiffres clés" chiffresCles={prototypeInformation.chiffres_cles} />
                )}

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
};

const DescriptionSection = ({ title, content }: { title?: string; content: string }) => {
    return (
        <div>
            {title && <h2>{title}</h2>}
            <RemoteHtml html={content} />
        </div>
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
                            <Link key={mot.id} href={`/mot-cle/${mot.identifiant}`} className={styles.linkStyle}>
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

export { ArticlePresentation, ArticlePrototype };
