import { Select } from '@base-ui-components/react/select';
import chevronIcon from '@public/chevron-up-icon.svg';
import { SearchFilterItem } from '@utils/searchUtils';
import Image from 'next/image';
import styles from './searchFilterSelectBox.module.css';

type SelectBoxProps = {
    items: SearchFilterItem[];
    value: SearchFilterItem;
    handleSearchFilterChange: (event: SearchFilterItem) => void;
    placeholder?: string;
    className?: { trigger?: string; popup?: string };
};

export default function SearchFilterSelectBox({ items, value, handleSearchFilterChange, placeholder, className }: SelectBoxProps) {
    return (
        <Select.Root modal={false} value={value} onValueChange={handleSearchFilterChange}>
            <Select.Trigger className={`${styles.trigger} ${className?.trigger}`}>
                <Select.Value placeholder={placeholder ?? 'Tout'} />
                <Select.Icon>
                    <Image src={chevronIcon} className={styles.chevronIcon} alt="chevron" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Positioner alignItemWithTrigger={false} side="top" align="end">
                <Select.Popup className={`${styles.popup} ${className?.popup}`}>
                    {items.map(item => (
                        <Select.Item className={styles.item} key={item.value} value={item}>
                            <Select.ItemText>{item.label}</Select.ItemText>
                        </Select.Item>
                    ))}
                </Select.Popup>
            </Select.Positioner>
        </Select.Root>
    );
}
