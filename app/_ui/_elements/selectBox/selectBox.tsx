import { Select } from '@base-ui-components/react/select';
import chevronIcon from '@public/chevron-up-icon.svg';
import { SearchFilterItem } from '@utils/searchUtils';
import Image from 'next/image';
import styles from './selectBox.module.css';

type SelectBoxProps = {
    items: SearchFilterItem[] | { label: string; value: string }[];
    value: SearchFilterItem | { label: string; value: string };
    handleValueChange: (event: SearchFilterItem | { label: string; value: string }) => void;
    placeholder?: string | number;
    className?: { trigger?: string; popup?: string };
};

export default function SelectBox({
    items,
    value,
    handleValueChange,
    placeholder,
    className,
}: SelectBoxProps) {
    return (
        <Select.Root modal={false} value={value} onValueChange={handleValueChange}>
            <Select.Trigger className={`${styles.trigger} ${className?.trigger}`}>
                <Select.Value placeholder={placeholder ?? ''} />
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
