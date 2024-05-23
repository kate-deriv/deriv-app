import React from 'react';
import Chip from 'AppV2/Components/Chip';
// import { daysFromTodayTo, toMoment } from '@deriv/shared';
import { ActionSheet, RadioGroup } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';

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

const TimeFilter = () => {
    const defaultCheckedTime = '0';
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [changedOptions, setChangedOptions] = React.useState<string>(defaultCheckedTime);

    const onRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setChangedOptions(value);
        setIsDropdownOpen(false);
        // console.log({
        //     from: value ? toMoment().startOf('day').subtract(value, 'day').add(1, 's') : undefined,
        //     to: toMoment().endOf('day'),
        //     is_batch: true,
        // });
    };

    const onReset = () => {
        setChangedOptions(defaultCheckedTime);
        setIsDropdownOpen(false);
    };

    const chipLabelFormatting = () => timeFilterList.find(item => item.value === changedOptions)?.label;

    return (
        <React.Fragment>
            <Chip
                label={chipLabelFormatting()}
                dropdown
                isDropdownOpen={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                selected={changedOptions !== defaultCheckedTime}
            />
            <ActionSheet.Root isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} position='left'>
                <ActionSheet.Portal>
                    <ActionSheet.Header title={<Localize i18n_default_text='Filter by trade types' />} />
                    <ActionSheet.Content className='filter__item__wrapper'>
                        {/* TODO: Replace with Quill component */}
                        <RadioGroup selected={changedOptions}>
                            {timeFilterList.map(({ value, label }) => (
                                <RadioGroup.Item value={value} label={label.props.i18n_default_text} key={value} />
                            ))}
                        </RadioGroup>
                        <div>Custom</div>
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
        </React.Fragment>
    );
};

export default TimeFilter;
