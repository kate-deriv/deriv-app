import React from 'react';
import { Localize } from '@deriv/translations';
import { Tab } from '@deriv-com/quill-ui';
import { TPortfolioPosition } from '@deriv/stores/types';
import { observer, useStore } from '@deriv/stores';
import { filterPositions } from '../../Utils/positions-utils';
import PositionsContent from './positions-content';
import { useReportsStore } from '../../../../../reports/src/Stores/useReportsStores';

type TPositionsProps = {
    onRedirectToTrade?: () => void;
};

// TODO: Remove after real data is available
const mockedActivePositions = [
    {
        contract_info: {
            account_id: 112905368,
            barrier: '682.60',
            barrier_count: 1,
            bid_price: 6.38,
            buy_price: 9,
            contract_id: 242807007748,
            contract_type: 'CALL',
            currency: 'USD',
            current_spot: 681.76,
            current_spot_display_value: '681.76',
            current_spot_time: 1716220628,
            date_expiry: 1716221100,
            date_settlement: 1716221100,
            date_start: 1716220562,
            display_name: 'Volatility 100 (1s) Index',
            entry_spot: 682.6,
            entry_spot_display_value: '682.60',
            entry_tick: 682.6,
            entry_tick_display_value: '682.60',
            entry_tick_time: 1716220563,
            expiry_time: 1716221100,
            id: '917d1b48-305b-a2f4-5b9c-7fb1f2c6c145',
            is_expired: 0,
            is_forward_starting: 0,
            is_intraday: 1,
            is_path_dependent: 0,
            is_settleable: 0,
            is_sold: 0,
            is_valid_to_cancel: 0,
            is_valid_to_sell: 1,
            longcode:
                'Win payout if Volatility 100 (1s) Index is strictly higher than entry spot at 2024-05-20 16:05:00 GMT.',
            payout: 17.61,
            profit: -2.62,
            profit_percentage: -29.11,
            purchase_time: 1716220562,
            shortcode: 'CALL_1HZ100V_17.61_1716220562_1716221100F_S0P_0',
            status: 'open',
            transaction_ids: {
                buy: 484286139408,
            },
            underlying: '1HZ100V',
        },
        details:
            'Win payout if Volatility 100 (1s) Index is strictly higher than entry spot at 2024-05-20 16:05:00 GMT.',
        display_name: '',
        id: 242807007748,
        indicative: 6.38,
        payout: 17.61,
        purchase: 9,
        reference: 484286139408,
        type: 'CALL',
        profit_loss: -2.62,
        is_valid_to_sell: true,
        status: 'profit',
        barrier: 682.6,
        entry_spot: 682.6,
    },
    {
        contract_info: {
            account_id: 112905368,
            barrier_count: 1,
            bid_price: 8.9,
            buy_price: 9.39,
            cancellation: {
                ask_price: 0.39,
                date_expiry: 1716224183,
            },
            commission: 0.03,
            contract_id: 242807045608,
            contract_type: 'MULTUP',
            currency: 'USD',
            current_spot: 681.71,
            current_spot_display_value: '681.71',
            current_spot_time: 1716220672,
            date_expiry: 4869849599,
            date_settlement: 4869849600,
            date_start: 1716220583,
            display_name: 'Volatility 100 (1s) Index',
            entry_spot: 682.23,
            entry_spot_display_value: '682.23',
            entry_tick: 682.23,
            entry_tick_display_value: '682.23',
            entry_tick_time: 1716220584,
            expiry_time: 4869849599,
            id: '917d1b48-305b-a2f4-5b9c-7fb1f2c6c145',
            is_expired: 0,
            is_forward_starting: 0,
            is_intraday: 0,
            is_path_dependent: 1,
            is_settleable: 0,
            is_sold: 0,
            is_valid_to_cancel: 1,
            is_valid_to_sell: 0,
            limit_order: {
                stop_out: {
                    display_name: 'Stop out',
                    order_amount: -9,
                    order_date: 1716220583,
                    value: '614.26',
                },
            },
            longcode:
                "If you select 'Up', your total profit/loss will be the percentage increase in Volatility 100 (1s) Index, multiplied by 90, minus commissions.",
            multiplier: 10,
            profit: -0.1,
            profit_percentage: -1.11,
            purchase_time: 1716220583,
            shortcode: 'MULTUP_1HZ100V_9.00_10_1716220583_4869849599_60m_0.00_N1',
            status: 'open',
            transaction_ids: {
                buy: 484286215128,
            },
            underlying: '1HZ100V',
            validation_error:
                'The spot price has moved. We have not closed this contract because your profit is negative and deal cancellation is active. Cancel your contract to get your full stake back.',
            validation_error_code: 'General',
        },
        details:
            "If you select 'Up', your total profit/loss will be the percentage increase in Volatility 100 (1s) Index, multiplied by 90, minus commissions.",
        display_name: '',
        id: 242807045608,
        indicative: 8.9,
        purchase: 9.39,
        reference: 484286215128,
        type: 'MULTUP',
        contract_update: {
            stop_out: {
                display_name: 'Stop out',
                order_amount: -9,
                order_date: 1716220583,
                value: '614.26',
            },
        },
        profit_loss: -0.1,
        is_valid_to_sell: false,
        status: 'profit',
        entry_spot: 682.23,
    },
    {
        contract_info: {
            account_id: 112905368,
            barrier_count: 2,
            barrier_spot_distance: '0.296',
            bid_price: 9.84,
            buy_price: 9,
            contract_id: 242807268688,
            contract_type: 'ACCU',
            currency: 'USD',
            current_spot: 682.72,
            current_spot_display_value: '682.72',
            current_spot_high_barrier: '683.016',
            current_spot_low_barrier: '682.424',
            current_spot_time: 1716220720,
            date_expiry: 1747785599,
            date_settlement: 1747785600,
            date_start: 1716220710,
            display_name: 'Volatility 100 (1s) Index',
            entry_spot: 682.58,
            entry_spot_display_value: '682.58',
            entry_tick: 682.58,
            entry_tick_display_value: '682.58',
            entry_tick_time: 1716220711,
            expiry_time: 1747785599,
            growth_rate: 0.01,
            high_barrier: '683.046',
            id: '917d1b48-305b-a2f4-5b9c-7fb1f2c6c145',
            is_expired: 0,
            is_forward_starting: 0,
            is_intraday: 0,
            is_path_dependent: 1,
            is_settleable: 0,
            is_sold: 0,
            is_valid_to_cancel: 0,
            is_valid_to_sell: 1,
            longcode:
                'After the entry spot tick, your stake will grow continuously by 1% for every tick that the spot price remains within the ± 0.04331% from the previous spot price.',
            low_barrier: '682.454',
            profit: 0.84,
            profit_percentage: 9.33,
            purchase_time: 1716220710,
            shortcode: 'ACCU_1HZ100V_9.00_0_0.01_1_0.000433139675_1716220710',
            status: 'open',
            tick_count: 230,
            tick_passed: 9,
            tick_stream: [
                {
                    epoch: 1716220711,
                    tick: 682.58,
                    tick_display_value: '682.58',
                },
                {
                    epoch: 1716220712,
                    tick: 682.71,
                    tick_display_value: '682.71',
                },
                {
                    epoch: 1716220713,
                    tick: 682.5,
                    tick_display_value: '682.50',
                },
                {
                    epoch: 1716220714,
                    tick: 682.57,
                    tick_display_value: '682.57',
                },
                {
                    epoch: 1716220715,
                    tick: 682.57,
                    tick_display_value: '682.57',
                },
                {
                    epoch: 1716220716,
                    tick: 682.75,
                    tick_display_value: '682.75',
                },
                {
                    epoch: 1716220717,
                    tick: 682.87,
                    tick_display_value: '682.87',
                },
                {
                    epoch: 1716220718,
                    tick: 682.74,
                    tick_display_value: '682.74',
                },
                {
                    epoch: 1716220719,
                    tick: 682.75,
                    tick_display_value: '682.75',
                },
                {
                    epoch: 1716220720,
                    tick: 682.72,
                    tick_display_value: '682.72',
                },
            ],
            transaction_ids: {
                buy: 484286658868,
            },
            underlying: '1HZ100V',
        },
        details:
            'After the entry spot tick, your stake will grow continuously by 1% for every tick that the spot price remains within the ± 0.04331% from the previous spot price.',
        display_name: '',
        id: 242807268688,
        indicative: 9.84,
        purchase: 9,
        reference: 484286658868,
        type: 'ACCU',
        profit_loss: 0.84,
        is_valid_to_sell: true,
        current_tick: 9,
        status: 'profit',
        entry_spot: 682.58,
        high_barrier: 683.046,
        low_barrier: 682.454,
    },
] as TPortfolioPosition[];

const Positions = observer(({ onRedirectToTrade }: TPositionsProps) => {
    const [contractTypeFilter, setContractTypeFilter] = React.useState<string[]>([]);
    const [filteredPositions, setFilteredPositions] = React.useState<Array<TPortfolioPosition>>(mockedActivePositions);
    const [noMatchesFound, setNoMatchesFound] = React.useState(false);
    const { client, portfolio } = useStore();
    const { currency } = client;
    const { onClickCancel, onClickSell } = portfolio;

    const { data, is_loading, onMount } = useReportsStore().profit_table;
    // TODO: remove this line
    // eslint-disable-next-line no-console
    const closedPositions = React.useMemo(() => data.map(d => ({ contract_info: d })), [data]);

    const tabs = [
        {
            id: 'open',
            title: <Localize i18n_default_text='Open' />,
            content: (
                <PositionsContent
                    currency={currency}
                    isLoading={is_loading}
                    noMatchesFound={noMatchesFound}
                    onClickCancel={onClickCancel}
                    onClickSell={onClickSell}
                    onRedirectToTrade={onRedirectToTrade}
                    positions={mockedActivePositions}
                    setContractTypeFilter={setContractTypeFilter}
                    contractTypeFilter={contractTypeFilter}
                />
            ),
        },
        {
            id: 'closed',
            title: <Localize i18n_default_text='Closed' />,
            content: (
                <PositionsContent
                    currency={currency}
                    isClosedTab
                    isLoading={is_loading}
                    noMatchesFound={noMatchesFound}
                    positions={filteredPositions}
                    setContractTypeFilter={setContractTypeFilter}
                    contractTypeFilter={contractTypeFilter}
                />
            ),
        },
    ];

    React.useEffect(() => {
        onMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (contractTypeFilter.length) {
            const result = filterPositions(closedPositions as any, contractTypeFilter);
            setNoMatchesFound(!result.length);
            setFilteredPositions(result);
        } else setFilteredPositions(closedPositions as any);
    }, [contractTypeFilter, closedPositions]);

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
});

export default Positions;
