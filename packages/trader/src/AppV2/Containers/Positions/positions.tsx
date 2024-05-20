import React from 'react';
import { Localize } from '@deriv/translations';
import { Tab } from '@deriv-com/quill-ui';
import { getSupportedContracts, isHighLow } from '@deriv/shared';
import { TPortfolioPosition } from '@deriv/stores/types';
import PositionsContent from './positions-content';

type TPositionsProps = {
    onRedirectToTrade?: () => void;
};

//TODO: remove after Bala's PR with hook for real data will be merged
const mockPositions = [
    {
        contract_info: {
            contract_type: 'MULTUP',
            purchase_time: 1716198125,
            shortcode: 'MULTUP_1HZ100V_10.00_10_1716014450_4869676799_0_0.00_N1',
        },
    },
    {
        contract_info: {
            contract_type: 'VANILLALONGCALL',
            purchase_time: 1716198390,
            shortcode: 'VANILLALONGCALL_1HZ100V_10.00_1716205893_1716206073_S0P_12.66345_1716205893',
        },
    },
    {
        contract_info: {
            contract_type: 'CALL',
            purchase_time: 1716205999,
            shortcode: 'CALL_1HZ100V_19.55_1716205999_1716206179_S0P_0',
        },
    },
    {
        contract_info: {
            contract_type: 'PUT',
            purchase_time: 1716206101,
            shortcode: 'PUT_1HZ100V_19.51_1716206101_1716206281_S0P_0',
        },
    },
    {
        contract_info: {
            contract_type: 'CALL',
            purchase_time: 1716206154,
            shortcode: 'CALL_1HZ100V_24.09_1716206154_1716206334_S40P_0',
        },
    },
    {
        contract_info: {
            contract_type: 'PUT',
            purchase_time: 1716206194,
            shortcode: 'PUT_1HZ100V_16.42_1716206194_1716206374_S40P_0',
        },
    },
] as TPortfolioPosition[];

const Positions = ({ onRedirectToTrade }: TPositionsProps) => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [filteredPositions, setFilteredPositions] = React.useState<TPortfolioPosition[]>(mockPositions || []);
    const [noMatchesFound, setNoMatchesFound] = React.useState(false);

    const tabs = [
        {
            id: 'open',
            title: <Localize i18n_default_text='Open' />,
            content: (
                <PositionsContent
                    onRedirectToTrade={onRedirectToTrade}
                    setSelectedOptions={setSelectedOptions}
                    positions={filteredPositions}
                    noMatchesFound={noMatchesFound}
                />
            ),
        },
        {
            id: 'closed',
            title: <Localize i18n_default_text='Closed' />,
            content: (
                <PositionsContent
                    isClosedTab
                    setSelectedOptions={setSelectedOptions}
                    positions={filteredPositions}
                    noMatchesFound={noMatchesFound}
                />
            ),
        },
    ];

    React.useEffect(() => {
        if (selectedOptions.length) {
            //TODO: create own config and move filtration into a separate util function
            const filteredPositions = mockPositions.filter(({ contract_info }) => {
                const config = getSupportedContracts(isHighLow({ shortcode: contract_info.shortcode }))[
                    contract_info.contract_type as keyof ReturnType<typeof getSupportedContracts>
                ];

                return selectedOptions.includes('main_title' in config ? config.main_title : config.name);
            });
            setNoMatchesFound(!filteredPositions.length);
            setFilteredPositions(filteredPositions);
        } else setFilteredPositions(mockPositions);
    }, [selectedOptions]);

    return (
        <div className='positions-page'>
            <Tab.Container contentStyle='fill' size='md' className='positions-page__tabs'>
                <Tab.List>
                    {tabs.map(({ id, title }) => (
                        <Tab.Trigger key={id}>{title}</Tab.Trigger>
                    ))}
                </Tab.List>
                <Tab.Content className='positions-page__tabs-content'>
                    {tabs.map(({ id, content }) => (
                        <Tab.Panel key={id}>{content}</Tab.Panel>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default Positions;
