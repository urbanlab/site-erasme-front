import DOMPurify from 'isomorphic-dompurify';
import styles from './remoteHtml.module.css';

/**
 * Remove <br> inside tag openings like <div ... <br> ...>
 * */
const cleanMalformedTags = (input: string): string => {
    return input.replace(/<([a-z]+)([^>]*?)<br[^>]*>([^>]*)>/gi, '<$1$2$3');
};

export default function RemoteHtml({
    html,
    returnOnlyText = false,
    textReturnLength = -1,
    className,
}: {
    html: string;
    returnOnlyText?: boolean;
    textReturnLength?: number;
    className?: string;
}) {
    const cleanedHtml = cleanMalformedTags(html);

    const sanitizedHtml = DOMPurify.sanitize(
        cleanedHtml,
        returnOnlyText ? { ALLOWED_ATTR: [], ALLOWED_TAGS: ['p'] } : { ADD_TAGS: ['iframe'] }
    );

    const slicedHtml = textReturnLength !== -1 ? `${sanitizedHtml.slice(0, textReturnLength)}...` : sanitizedHtml;

    return <div className={`${styles.remoteHtml} ${className}`} dangerouslySetInnerHTML={{ __html: slicedHtml }} />;
}
