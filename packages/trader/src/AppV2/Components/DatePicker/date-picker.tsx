import React from 'react';
import { ActionSheet } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';

type TDatePicker = {
    isOpen?: boolean;
    onClose?: () => void;
};
const DatePicker = ({ isOpen, onClose }: TDatePicker) => {
    return (
        <ActionSheet.Root isOpen={isOpen} onClose={onClose} position='left'>
            <ActionSheet.Portal>
                <ActionSheet.Header title={<Localize i18n_default_text='Choose a date range' />} />
                <ActionSheet.Content>
                    <div style={{ height: '200px', width: '100%' }}>YO</div>
                </ActionSheet.Content>
                <ActionSheet.Footer
                    secondaryAction={{
                        content: 'Reset',
                        onAction: () => null,
                    }}
                    alignment='vertical'
                />
            </ActionSheet.Portal>
        </ActionSheet.Root>
    );
};

export default DatePicker;
