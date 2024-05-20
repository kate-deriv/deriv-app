import React from 'react';
import Chip from 'AppV2/Components/Chip';
import { ActionSheet, Checkbox } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';

// type TFilter = {};
// TODO: replace TRADE_TYPE_LIST with real data when BE will be ready (send list of all available contracts based on account)
const TRADE_TYPE_LIST = [
    <Localize i18n_default_text='Accumulators' key='0' />,
    <Localize i18n_default_text='Vanillas' key='1' />,
    <Localize i18n_default_text='Turbos' key='2' />,
    <Localize i18n_default_text='Multipliers' key='3' />,
    <Localize i18n_default_text='Rise/Fall' key='4' />,
    <Localize i18n_default_text='Higher/Lower' key='5' />,
    <Localize i18n_default_text='Touch/No touch' key='6' />,
    <Localize i18n_default_text='Matches/Differs' key='7' />,
    <Localize i18n_default_text='Even/Odd' key='8' />,
    <Localize i18n_default_text='Over/Under' key='9' />,
];

// TODO: replace title string with Localize after type fix in quill

const Filter = () => {
    const [isDropdownOpen, setIsDropDownOpen] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [changedOptions, setChangedOptions] = React.useState<string[]>([]);

    const onDropdownClick = () => {
        setIsDropDownOpen(!isDropdownOpen);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLSpanElement>) => {
        const newSelectedOption = (e.target as EventTarget & HTMLInputElement).id;

        if (changedOptions.includes(newSelectedOption)) {
            setChangedOptions([...changedOptions.filter(item => item !== newSelectedOption)]);
        } else {
            setChangedOptions([...changedOptions, newSelectedOption]);
        }
    };

    const onApply = () => {
        console.log('applied');
        setSelectedOptions(changedOptions);
    };
    const onClearAll = () => {
        console.log('clear all');
        setSelectedOptions([]);
        setChangedOptions([]);
    };

    const chipLabelFormatting = () => {
        const arrayLength = selectedOptions.length;
        if (!arrayLength) return <Localize i18n_default_text='All trade types' />;
        if (selectedOptions.length === 1)
            return <Localize i18n_default_text='{{tradeType}}' values={{ tradeType: selectedOptions[0] }} />;
        return <Localize i18n_default_text='{{amount}} trade types' values={{ amount: arrayLength }} />;
    };

    return (
        <>
            <Chip
                label={chipLabelFormatting()}
                dropdown
                isDropdownOpen={isDropdownOpen}
                onClick={onDropdownClick}
                selected={!!selectedOptions.length}
            />
            <ActionSheet.Root isOpen={isDropdownOpen} onClose={() => setIsDropDownOpen(false)} position='left'>
                <ActionSheet.Portal>
                    {/* TODO: add PR to Quill with changing type of title (need ReactNode)*/}
                    <ActionSheet.Header title='Filter by trade types' />
                    <ActionSheet.Content className='filter__item__wrapper'>
                        {TRADE_TYPE_LIST.map(item => (
                            <Checkbox
                                label={item}
                                className='filter__item'
                                key={item.props.i18n_default_text}
                                onChange={onChange}
                                id={item.props.i18n_default_text}
                                checked={selectedOptions.length ? undefined : false}
                                size='md'
                            />
                        ))}
                    </ActionSheet.Content>
                    {/* TODO: add PR to Quill in order to switch off (make optional) ability to close action sheet by clicking on btns */}
                    <ActionSheet.Footer
                        primaryAction={{ content: 'Apply', onAction: onApply }}
                        secondaryAction={{ content: 'Clear All', onAction: onClearAll }}
                        alignment='vertical'
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export default Filter;
