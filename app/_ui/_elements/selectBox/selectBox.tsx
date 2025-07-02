import { Select } from '@base-ui-components/react/select';
import { ControlledComponentType, ControlledComponentValueType } from '@globals/types';
import chevronIcon from '@public/chevron-up-icon.svg';
import Image from 'next/image';
import styles from './selectBox.module.css';

type SelectBoxProps = {
    items: ControlledComponentType[];
    value: ControlledComponentValueType;
    handleValueChange: (value: ControlledComponentValueType) => void;
    className?: { trigger?: string; popup?: string };
    portalContainer?: React.RefObject<HTMLDivElement | null>;
};

export default function SelectBox({ items, value, handleValueChange, className, portalContainer }: SelectBoxProps) {
    return (
        <Select.Root modal={false} value={value} items={items} onValueChange={handleValueChange}>
            <Select.Trigger className={`${styles.trigger} ${className?.trigger}`}>
                <Select.Value />
                <Select.Icon>
                    <Image src={chevronIcon} className={styles.chevronIcon} alt="chevron" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal container={portalContainer}>
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
