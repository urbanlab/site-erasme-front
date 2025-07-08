'use client';

import { useLazyQuery } from '@apollo/client/react/hooks/useLazyQuery';
import { FragmentType, getFragmentData } from '@graphql/__generated__';
import { ArticleFullInformationFieldsFragmentDoc } from '@graphql/__generated__/graphql';
import { ARTICLE } from '@graphql/queries';
import ArticleCard from '@ui/components/articleCard';
import Button from '@ui/elements/button';
import styles from 'page.module.css';
import { useCallback, useEffect } from 'react';

const LoadArchiveIcon = ({ className }: { className: string }) => (
    <svg
        className={className}
        width="247"
        height="184"
        viewBox="0 0 247 184"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M179.701 163.596L158.142 125.623L134.107 77.3758L155.666 115.349L160.185 124.443L179.701 163.596Z"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M127.223 74.5903L119.147 60.3324L95.1123 12.0857L103.188 26.3437L119.964 60.0198L127.223 74.5903Z"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M127.231 74.5902L119.972 60.0178L103.193 26.337C108.624 24.4377 113.888 23.0206 118.959 22.0855C124.03 21.1263 128.91 20.6733 133.621 20.6783C151.887 20.6976 164.218 26.2328 170.612 37.3319C172.896 41.289 174.17 45.5585 174.482 50.1164C174.892 56.1935 173.522 62.8234 170.398 70.006C167.105 69.3997 163.548 69.0583 159.702 68.9819L156.938 64.1321L147.469 69.6201C146.002 69.8114 144.512 70.051 142.998 70.3388C137.926 71.2738 132.663 72.691 127.231 74.5902Z"
            fill="#DADADA"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M179.717 163.597L160.199 124.441L155.679 115.346L197.185 91.2529L220.473 77.7501L220.954 77.4613L244.992 125.713L179.717 163.597Z"
            fill="#DADADA"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M155.672 115.367L134.11 77.3894L147.473 69.615L156.942 64.1272L159.706 68.9769L165.571 79.3036L166.533 77.6649C168.047 75.0382 169.344 72.4835 170.402 70.001C173.526 62.8185 174.895 56.1889 174.486 50.1119C174.173 45.5541 172.899 41.2848 170.616 37.3278C164.222 26.2289 151.891 20.6939 133.625 20.6746C128.914 20.6696 124.035 21.1226 118.964 22.0817C113.893 23.0168 108.629 24.4339 103.198 26.3331L95.1211 12.0736C103.99 8.61066 112.546 6.01549 120.789 4.28807C129.033 2.53653 136.941 1.67683 144.535 1.68488C168.786 1.71056 185.178 9.08247 193.736 23.8247C194.505 25.1518 195.178 26.4787 195.779 27.8538C199.313 35.9596 199.938 44.9786 197.656 54.9108C196.022 62.0225 192.874 69.6149 188.236 77.6879L188.164 77.8084L187.299 79.3266L188.861 78.4119L212.342 64.7887L213.399 64.187L217.317 71.0875L220.947 77.4814L220.466 77.7702L197.178 91.2731L155.672 115.367Z"
            fill="currentColor"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M187.312 79.3224L188.177 77.8043L188.249 77.6838C192.886 69.6115 196.034 62.0198 197.668 54.9088C199.95 44.9775 199.325 35.9593 195.791 27.8542L217.327 71.0839L213.41 64.184L212.352 64.7857L188.874 78.4078L187.312 79.3224Z"
            fill="#F4F4F4"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M89.1662 114.498C88.5653 114.498 87.9885 114.497 87.4117 114.448C83.3735 106.487 75.249 90.4197 70.2012 80.2149C67.6292 75.0039 65.8504 71.337 65.8264 71.0476L88.6813 57.786L112.718 106.036L99.3323 113.786C95.8475 114.288 92.4588 114.502 89.1662 114.498Z"
            fill="#F4F4F4"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.1286 111.739L25.8359 105.949L1.8009 57.7023L9.37179 70.9952L25.5714 103.513C25.7877 104.237 26.0281 104.96 26.3405 105.66C26.7732 106.938 27.326 108.168 27.9509 109.375L29.1286 111.739Z"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M78.2256 133.494C76.2067 133.492 74.2358 133.442 72.3371 133.319C63.4202 132.852 55.705 131.252 49.1674 128.52C43.3268 126.127 38.4235 122.842 34.4815 118.642C33.2076 117.315 32.0778 115.915 31.0202 114.419C30.3231 113.43 29.6741 112.416 29.0491 111.354C28.6645 110.703 28.304 110.052 27.9674 109.376C27.3424 108.17 26.7896 106.939 26.3568 105.661C26.0443 104.961 25.8039 104.238 25.5876 103.514C21.4286 90.4161 24.4318 75.0832 34.525 57.5154L35.4863 55.8526L9.38582 70.9921L1.81394 57.6977L67.0891 19.8126L88.675 57.7897L65.8191 71.0519L57.1895 55.8755L56.2523 57.5384C48.6583 70.7203 46.448 82.2441 49.6453 92.1339C50.2464 94.1118 51.1117 96.0177 52.1694 97.8755C53.7319 100.578 55.6548 102.967 57.9382 105.019C58.1786 105.236 58.3949 105.43 58.6353 105.623C63.2022 109.486 69.1389 112.096 76.4215 113.43C79.6902 114.036 83.2474 114.378 87.0929 114.454C87.1891 114.478 87.3092 114.479 87.4054 114.455C87.9822 114.503 88.559 114.504 89.1599 114.505C92.4526 114.508 95.8415 114.295 99.3265 113.792C100.817 113.625 102.307 113.385 103.821 113.097C108.892 112.162 114.132 110.745 119.563 108.846L127.664 123.106C118.795 126.568 110.239 129.164 101.996 130.891C93.7519 132.643 85.8205 133.502 78.2256 133.494Z"
            fill="currentColor"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M102.266 181.726C78.0136 181.701 61.6205 174.328 53.0867 159.585C52.2694 158.186 51.5482 156.786 50.9472 155.315L50.851 155.097L29.1915 111.788L29.1434 111.716L27.9655 109.352C28.302 110.027 28.6626 110.679 29.0472 111.33C29.6723 112.392 30.3213 113.405 31.0184 114.395C32.0761 115.891 33.2059 117.291 34.4799 118.619C38.4221 122.819 43.3257 126.103 49.1666 128.497C55.7046 131.229 63.4203 132.829 72.3377 133.296C74.2366 133.419 76.2075 133.469 78.2266 133.471C85.822 133.479 93.7538 132.619 101.998 130.868C110.242 129.14 118.799 126.545 127.668 123.082L151.707 171.337C142.838 174.8 134.282 177.395 126.037 179.123C117.793 180.874 109.861 181.734 102.266 181.726Z"
            fill="#DADADA"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.5747 103.514L9.37491 70.9952L35.4727 55.857L34.5115 57.5196C24.4192 75.0858 21.4163 90.4171 25.5747 103.514Z"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M87.4024 114.448C87.4024 114.448 87.1861 114.472 87.09 114.448L81.2255 104.122L57.1904 55.8754L65.8189 71.0501C65.8189 71.3394 67.6215 75.0062 70.1933 80.2168C75.2407 90.4209 83.3645 106.487 87.4024 114.448Z"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M76.4202 113.425C69.1384 112.091 63.2022 109.481 58.6359 105.618C58.3955 105.425 58.1792 105.232 57.9389 105.015C55.6557 102.963 53.7329 100.574 52.1706 97.872C51.1131 96.0143 50.2478 94.1087 49.6469 92.1309C46.4499 82.2421 48.6601 70.7193 56.2533 57.5386L57.1904 55.876L81.226 104.123L80.2889 105.786C78.775 108.388 77.5015 110.943 76.4202 113.425Z"
            fill="#DADADA"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
    </svg>
);

const ArchiveArticleCard = ({
    articleIdList,
    textLength,
    className,
}: {
    articleIdList: string[];
    textLength: number;
    className?: string;
}) => {
    const [getArticle, { data }] = useLazyQuery(ARTICLE);

    const getRandomArticleIdFromList = useCallback((): number => {
        return parseInt(articleIdList[Math.floor(Math.random() * articleIdList.length)]);
    }, [articleIdList]);

    useEffect(() => {
        getArticle({ variables: { id: getRandomArticleIdFromList() } });
    }, [getArticle, articleIdList, getRandomArticleIdFromList]);

    const article = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data?.getArticle as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    return (
        <div className={className}>
            <h2 className={styles.title}>Archives</h2>
            <ArticleCard article={article} variant="archive" textLength={textLength} className={styles.card} />
            <Button
                className={styles.button}
                variant="no-style"
                onClick={() => getArticle({ variables: { id: getRandomArticleIdFromList() } })}
            >
                <LoadArchiveIcon className={styles.loadIcon} />
            </Button>
        </div>
    );
};

export { ArchiveArticleCard };
