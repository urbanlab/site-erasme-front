import DOMPurify from 'isomorphic-dompurify';
import styles from './remoteHtml.module.css';

export default function RemoteHtml({ html, className }: { html: string, className?: string }) {
    const sanitizedHtml = DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'] });

    return <div className={`${styles.remoteHtml} ${className}`} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
