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
    const [formattedChosenRange, setFormattedChosenRange] = React.useState<string>();
    const [chosenRange, setChosenRange] = React.useState<(string | null | Date)[] | null | Date>([]);

    const onApply = () => {
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
                        optionsConfig={{
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        }}
                    />
                </ActionSheet.Content>
                <ActionSheet.Footer
                    primaryAction={{
                        content: 'Apply',
                        onAction: onApply,
                    }}
                    alignment='vertical'
                    isPrimaryButtonDisabled={!formattedChosenRange}
                />
            </ActionSheet.Portal>
        </ActionSheet.Root>
    );
};

export default DateRangePicker;
