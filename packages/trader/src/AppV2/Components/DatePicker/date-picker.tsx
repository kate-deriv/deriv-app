import React from 'react';
import { ActionSheet, DatePicker } from '@deriv-com/quill-ui';
import { toMoment } from '@deriv/shared';
import { Localize } from '@deriv/translations';

type TDateRangePicker = {
    isOpen?: boolean;
    onClose: () => void;
    setFormattedSelectedRangeDate: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleDateChange: (values: { to?: moment.Moment; from?: moment.Moment; is_batch?: boolean }) => void;
};
const DateRangePicker = ({ isOpen, onClose, setFormattedSelectedRangeDate, handleDateChange }: TDateRangePicker) => {
    const [formattedChosenRange, setFormattedChosenRange] = React.useState('');
    const [chosenRange, setChosenRange] = React.useState<(string | null | Date)[] | null | Date>([]);

    const onApply = () => {
        console.log('formattedChosenRange', formattedChosenRange);
        setFormattedSelectedRangeDate(formattedChosenRange);
        if (Array.isArray(chosenRange) && chosenRange.length)
            handleDateChange({ from: toMoment(chosenRange[0]), to: toMoment(chosenRange[1]) });
        onClose();
    };

    return (
        <ActionSheet.Root isOpen={isOpen} onClose={onClose} position='left'>
            <ActionSheet.Portal>
                <ActionSheet.Header title={<Localize i18n_default_text='Choose a date range' />} />
                <ActionSheet.Content>
                    <DatePicker
                        selectRange
                        onFormattedDate={value => setFormattedChosenRange(value)}
                        className='date-picker__action-sheet'
                        onChange={value => setChosenRange(value)}
                    />
                </ActionSheet.Content>
                <ActionSheet.Footer
                    primaryAction={{
                        content: 'Apply',
                        onAction: onApply,
                    }}
                    alignment='vertical'
                    // TODO: update Quill to the latest version and disable button based on chosenRange
                    // isPrimaryButtonDisabled
                />
            </ActionSheet.Portal>
        </ActionSheet.Root>
    );
};

export default DateRangePicker;
