import { ControlledComponentType } from '@globals/types';

const itemsPerPageOptions: ControlledComponentType[] = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
];

const dateFormat = (dateTime: string): string => {
    const [datePart] = dateTime.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
};

export { itemsPerPageOptions, dateFormat };
