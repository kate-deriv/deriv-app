import React from 'react';
import { ActionSheet, DatePicker } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';

type TDateRangePicker = {
    isOpen?: boolean;
    onClose: () => void;
    setFormattedSelectedRangeDate: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const DateRangePicker = ({ isOpen, onClose, setFormattedSelectedRangeDate }: TDateRangePicker) => {
    const [formattedChosenRange, setFormattedChosenRange] = React.useState('');

    const onApply = () => {
        setFormattedSelectedRangeDate(formattedChosenRange);
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
                        onChange={(value, event) => console.log('value', value)}
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
