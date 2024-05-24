import React from 'react';
import Chip from 'AppV2/Components/Chip';
import { toMoment } from '@deriv/shared';
import { ActionSheet, RadioGroup } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';
import CustomDateFilterButton from './custom-time-filter-button';
import DateRangePicker from 'AppV2/Components/DatePicker';

type TTimeFilter = {
    handleDateChange: (
        date_values: { from?: moment.Moment; to: moment.Moment; is_batch: boolean },
        date_range?: {
            date_range: any;
        }
    ) => void;
};

// TODO: replace strings with numbers when types in Quill be changed
const timeFilterList = [
    {
        value: '0',
        label: <Localize i18n_default_text='All time' />,
    },
    {
        value: '1',
        label: <Localize i18n_default_text='Today' />,
    },
    {
        value: '2',
        label: <Localize i18n_default_text='Yesterday' />,
    },
    {
        value: '7',
        label: <Localize i18n_default_text='Last 7 days' />,
    },
    {
        value: '30',
        label: <Localize i18n_default_text='Last 30 days' />,
    },
    {
        value: '60',
        label: <Localize i18n_default_text='Last 60 days' />,
    },
    {
        value: '90',
        label: <Localize i18n_default_text='Last 90 days' />,
    },
];

const TimeFilter = ({ handleDateChange }: TTimeFilter) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [chosenTimeFilter, setChosenTimeFilter] = React.useState<string>();
    const [formattedSelectedRangeDate, setFormattedSelectedRangeDate] = React.useState<string>();

    const defaultCheckedTime = '0';

    const onRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === defaultCheckedTime) {
            onReset();
            return;
        }
        setChosenTimeFilter(value);
        setIsDropdownOpen(false);
        handleDateChange({
            from: Number(value) ? toMoment().startOf('day').subtract(Number(value), 'day').add(1, 's') : undefined,
            to: toMoment().endOf('day'),
            is_batch: true,
        });
    };

    const onReset = () => {
        setChosenTimeFilter('');
        setIsDropdownOpen(false);
        handleDateChange({
            from: Number(defaultCheckedTime)
                ? toMoment().startOf('day').subtract(Number(defaultCheckedTime), 'day').add(1, 's')
                : undefined,
            to: toMoment().endOf('day'),
            is_batch: true,
        });
    };

    const chipLabelFormatting = () =>
        timeFilterList.find(item => item.value === (chosenTimeFilter || defaultCheckedTime))?.label;

    return (
        <React.Fragment>
            <Chip
                label={chipLabelFormatting()}
                dropdown
                isDropdownOpen={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                selected={!!chosenTimeFilter}
            />
            <ActionSheet.Root isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} position='left'>
                <ActionSheet.Portal>
                    <ActionSheet.Header title={<Localize i18n_default_text='Filter by trade types' />} />
                    <ActionSheet.Content className='filter__item__wrapper'>
                        <RadioGroup
                            selected={formattedSelectedRangeDate || chosenTimeFilter || defaultCheckedTime}
                            onToggle={onRadioButtonChange}
                            size='sm'
                            className='filter__item--radio'
                        >
                            {timeFilterList.map(({ value, label }) => (
                                <RadioGroup.Item value={value} label={label.props.i18n_default_text} key={value} />
                            ))}
                        </RadioGroup>
                        <CustomDateFilterButton
                            setShowDatePicker={setShowDatePicker}
                            formattedSelectedRangeDate={formattedSelectedRangeDate}
                        />
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        secondaryAction={{
                            content: 'Reset',
                            onAction: onReset,
                        }}
                        alignment='vertical'
                        shouldCloseOnSecondaryButtonClick={false}
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
            {showDatePicker && (
                <DateRangePicker
                    isOpen={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    setFormattedSelectedRangeDate={setFormattedSelectedRangeDate}
                />
            )}
        </React.Fragment>
    );
};

export default TimeFilter;
