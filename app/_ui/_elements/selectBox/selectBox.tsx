import { Select } from '@base-ui-components/react/select';
import chevronIcon from '@public/chevron-up-icon.svg';
import Image from 'next/image';
import styles from './selectBox.module.css';

type SelectBoxProps = {
    placeholder?: string;
    items: { label: string; value: string }[];
    className?: { trigger?: string; popup?: string };
};

export default function SelectBox({ placeholder, items, className }: SelectBoxProps) {
    return (
        <Select.Root modal={false}>
            <Select.Trigger className={`${styles.trigger} ${className?.trigger}`}>
                <Select.Value placeholder={placeholder ?? 'Tout'} />
                <Select.Icon>
                    <Image src={chevronIcon} className={styles.chevronIcon} alt="chevron" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner alignItemWithTrigger={false} side="top" align="end">
                    <Select.Popup className={`${styles.popup} ${className?.popup}`}>
                        {items.map(item => (
                            <Select.Item className={styles.item} key={item.value} value={item.value}>
                                <Select.ItemText>{item.label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    );
}
