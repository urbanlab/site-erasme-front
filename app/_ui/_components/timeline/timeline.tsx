import { parseTimelineData } from './_utils';
import styles from './timeline.module.css';

const Timeline = ({ timeline, className }: { timeline: string; className?: string }) => {
    const parsedTimeline = parseTimelineData(timeline);

    return (
        <ul className={`${styles.timelineContainer} ${className}`}>
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

export { Timeline };
