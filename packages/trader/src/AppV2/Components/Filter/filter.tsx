import React from 'react';
import Chip from 'AppV2/Components/Chip';
import { ActionSheet, Checkbox } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';

type TFilter = {
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

// TODO: replace TRADE_TYPE_LIST with real data when BE will be ready (send list of all available contracts based on account)
const TRADE_TYPE_LIST = [
    { tradeType: <Localize i18n_default_text='Accumulators' />, id: 'Accumulators' },
    { tradeType: <Localize i18n_default_text='Vanillas' />, id: 'Vanillas' },
    { tradeType: <Localize i18n_default_text='Turbos' />, id: 'Turbos' },
    { tradeType: <Localize i18n_default_text='Multipliers' />, id: 'Multipliers' },
    { tradeType: <Localize i18n_default_text='Rise/Fall' />, id: 'Rise/Fall' },
    { tradeType: <Localize i18n_default_text='Higher/Lower' />, id: 'Higher/Lower' },
    { tradeType: <Localize i18n_default_text='Touch/No touch' />, id: 'Touch/No touch' },
    { tradeType: <Localize i18n_default_text='Matches/Differs' />, id: 'Matches/Differs' },
    { tradeType: <Localize i18n_default_text='Even/Odd' />, id: 'Even/Odd' },
    { tradeType: <Localize i18n_default_text='Over/Under' />, id: 'Over/Under' },
];

// TODO: replace title string with Localize after type fix in quill

const Filter = ({ setSelectedOptions }: TFilter) => {
    const [isDropdownOpen, setIsDropDownOpen] = React.useState(false);
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
        setSelectedOptions(changedOptions);
    };
    const onClearAll = () => {
        setSelectedOptions([]);
        setChangedOptions([]);
    };

    const chipLabelFormatting = () => {
        const arrayLength = changedOptions.length;
        if (!arrayLength) return <Localize i18n_default_text='All trade types' />;
        if (changedOptions.length === 1) return TRADE_TYPE_LIST.find(type => type.id === changedOptions[0])?.tradeType;
        return <Localize i18n_default_text='{{amount}} trade types' values={{ amount: arrayLength }} />;
    };

    return (
        <>
            <Chip
                label={chipLabelFormatting()}
                dropdown
                isDropdownOpen={isDropdownOpen}
                onClick={onDropdownClick}
                selected={!!changedOptions.length}
            />
            <ActionSheet.Root isOpen={isDropdownOpen} onClose={() => setIsDropDownOpen(false)} position='left'>
                <ActionSheet.Portal>
                    {/* TODO: add PR to Quill with changing type of title (need ReactNode)*/}
                    <ActionSheet.Header title='Filter by trade types' />
                    <ActionSheet.Content className='filter__item__wrapper'>
                        {TRADE_TYPE_LIST.map(({ tradeType, id }) => (
                            <Checkbox
                                label={tradeType}
                                className='filter__item'
                                key={id}
                                onChange={onChange}
                                id={id}
                                checked={changedOptions.includes(id)}
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
