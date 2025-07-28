import Button from '@ui/components/button';
import styles from './pagination.module.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
};

export default function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    const getPageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className={`${styles.mainContainer} ${className}`}>
            <p>Pages</p>
            {getPageNumbers().map(page => {
                const isCurrentPage: boolean = page === currentPage;

                return (
                    <Button
                        key={page}
                        variant="ghost"
                        onClick={() => onPageChange(page)}
                        className={isCurrentPage ? styles.currentPage : ''}
                    >
                        {page}
                    </Button>
                );
            })}
        </div>
    );
}
