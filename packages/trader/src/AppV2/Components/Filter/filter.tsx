import React from 'react';
import Chip from 'AppV2/Components/Chip';
import { ActionSheet, Checkbox, CheckboxGroup } from '@deriv-com/quill-ui';
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
const config = [
    {
        label: 'Parent 1',
        id: 1,
        className: 'filter__item',
    },
    {
        label: 'Parent 2',
        id: 2,
        className: 'filter__item',
    },
    {
        label: 'Parent 3',
        id: 3,
        checked: true,
        className: 'filter__item',
    },
];
// TODO: replace title string with Localize after type fix in quill

const Filter = () => {
    const [isDropdownOpen, setIsDropDownOpen] = React.useState(false);

    const onDropdownClick = () => {
        setIsDropDownOpen(!isDropdownOpen);
    };

    return (
        <>
            <Chip
                label={<Localize i18n_default_text='All trade types' />}
                dropdown
                isDropdownOpen={isDropdownOpen}
                onClick={onDropdownClick}
            />
            <ActionSheet.Root isOpen={isDropdownOpen} onClose={() => setIsDropDownOpen(false)} position='left'>
                <ActionSheet.Portal>
                    <ActionSheet.Header title='Filter by trade types' />
                    <ActionSheet.Content className='filter__item__wrapper'>
                        {TRADE_TYPE_LIST.map(item => (
                            <Checkbox label={item} className='filter__item' key={item.props.i18n_default_text} />
                        ))}
                        <CheckboxGroup checkboxGroupConfig={config} />
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={{ content: 'Apply', onAction: () => null }}
                        secondaryAction={{ content: 'Clear All', onAction: () => null }}
                        alignment='vertical'
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export default Filter;
