import { Select } from '@base-ui-components/react/select';
import { ControlledComponentType, ControlledComponentValueType } from '@globals/types';
import chevronIcon from '@public/chevron-up-icon.svg';
import Image from 'next/image';
import styles from './selectBox.module.css';

const SelectPositionerAndPopup = ({
    items,
    className,
}: {
    items: ControlledComponentType[];
    className?: { trigger?: string; popup?: string };
}) => {
    return (
        <Select.Positioner alignItemWithTrigger={false} side="bottom" align="end">
            <Select.Popup className={`${styles.popup} ${className?.popup}`}>
                {items.map(item => (
                    <Select.Item className={styles.item} key={item.value} value={item.value}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                    </Select.Item>
                ))}
            </Select.Popup>
        </Select.Positioner>
    );
};

type SelectBoxProps = {
    items: ControlledComponentType[];
    value: ControlledComponentValueType;
    handleValueChange: (value: ControlledComponentValueType) => void;
    className?: { trigger?: string; popup?: string };
    createPortal?: boolean;
};

export default function SelectBox({
    items,
    value,
    handleValueChange,
    className,
    createPortal = false,
}: SelectBoxProps) {
    return (
        <Select.Root modal={false} value={value} items={items} onValueChange={handleValueChange}>
            <Select.Trigger className={`${styles.trigger} ${className?.trigger}`}>
                <Select.Value />
                <Select.Icon>
                    <Image src={chevronIcon} className={styles.chevronIcon} alt="chevron" />
                </Select.Icon>
            </Select.Trigger>

            {createPortal ? (
                <Select.Portal>
                    <SelectPositionerAndPopup items={items} className={className} />
                </Select.Portal>
            ) : (
                <SelectPositionerAndPopup items={items} className={className} />
            )}
        </Select.Root>
    );
}
