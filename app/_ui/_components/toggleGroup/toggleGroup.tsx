import { ControlledComponentType, ControlledComponentValueType } from '@globals/types';
import Button, { ButtonVariantType } from '@ui/components/button';

type ToggleGroupProps = {
    items: ControlledComponentType[];
    value: ControlledComponentValueType;
    handleValueChange: (value: ControlledComponentValueType) => void;
    toggleButtonVariant?: ButtonVariantType;
    className?: string;
};

export default function ToggleGroup({
    items,
    value,
    handleValueChange,
    toggleButtonVariant = 'filter',
    className,
}: ToggleGroupProps) {
    const handleToggleClick = (clickedToggleValue: ControlledComponentValueType) => {
        return clickedToggleValue === value ? handleValueChange(null) : handleValueChange(clickedToggleValue);
    };

    return (
        <div className={className} role="group">
            {items
                .filter(item => item.value !== null)
                .map(item => {
                    const isActive = item.value === value;
                    return (
                        <Button
                            key={item.value}
                            variant={toggleButtonVariant}
                            onClick={() => handleToggleClick(item.value)}
                            {...(isActive && { 'data-selected': true })}
                            tabIndex={isActive ? 0 : -1}
                            aria-disabled={false}
                            aria-pressed={isActive}
                        >
                            {item.label}
                        </Button>
                    );
                })}
        </div>
    );
}
