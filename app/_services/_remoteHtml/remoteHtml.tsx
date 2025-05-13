import DOMPurify from 'isomorphic-dompurify';
import styles from './remoteHtml.module.css';

export default function RemoteHtml({ html }: { html: string }) {
    const sanitizedHtml = DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'] });

    return <div className={styles.remoteHtml} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
