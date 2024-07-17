import React from 'react';
import { render, screen } from '@testing-library/react';
import { TRADE_TYPES } from '@deriv/shared';
import { mockStore } from '@deriv/stores';
import ModulesProvider from 'Stores/Providers/modules-providers';
import TraderProviders from '../../../../trader-providers';
import { ReportsStoreProvider } from '../../../../../../reports/src/Stores/useReportsStores';
import TradeParameters from '../trade-parameters';

const TRADE_PARAMS = {
    ALLOW_EQUALS: 'AllowEquals',
    DURATION: 'Duration',
    STAKE: 'Stake',
    BARRIER: 'Barrier',
    GROWTH_RATE: 'GrowthRate',
    TAKE_PROFIT: 'TakeProfit',
    ACCUMULATORS_INFORMATION: 'AccumulatorsInformation',
    MULTIPLIER: 'Multiplier',
    RISK_MANAGEMENT: 'RiskManagement',
    MULTIPLIERS_INFORMATION: 'MultipliersInformation',
    TRADE_TYPE_TABS: 'TradeTypeTabs',
    STRIKE: 'Strike',
    PAYOUT_PER_POINT: 'PayoutPerPoint',
    LAST_DIGIT_PREDICTION: 'LastDigitPrediction',
};
const data_test = 'dt_trade_param';

jest.mock('../AllowEquals', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.ALLOW_EQUALS}</div>));
jest.mock('../Duration', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.DURATION}</div>));
jest.mock('../Stake', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.STAKE}</div>));
jest.mock('../Barrier', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.BARRIER}</div>));
jest.mock('../GrowthRate', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.GROWTH_RATE}</div>));
jest.mock('../TakeProfit', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.TAKE_PROFIT}</div>));
jest.mock('../AccumulatorsInformation', () =>
    jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.ACCUMULATORS_INFORMATION}</div>)
);
jest.mock('../Multiplier', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.MULTIPLIER}</div>));
jest.mock('../RiskManagement', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.RISK_MANAGEMENT}</div>));
jest.mock('../MultipliersInformation', () =>
    jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.MULTIPLIERS_INFORMATION}</div>)
);
jest.mock('../TradeTypeTabs', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.TRADE_TYPE_TABS}</div>));
jest.mock('../Strike', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.STRIKE}</div>));
jest.mock('../PayoutPerPoint', () => jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.PAYOUT_PER_POINT}</div>));
jest.mock('../LastDigitPrediction', () =>
    jest.fn(() => <div data-testid={data_test}>{TRADE_PARAMS.LAST_DIGIT_PREDICTION}</div>)
);

describe('TradeParameters', () => {
    let defaultMockStore: ReturnType<typeof mockStore>;

    beforeEach(() => {
        defaultMockStore = mockStore({});
    });

    const mockTradeParameters = () => {
        return (
            <TraderProviders store={defaultMockStore}>
                <ReportsStoreProvider>
                    <ModulesProvider store={defaultMockStore}>
                        <TradeParameters />
                    </ModulesProvider>
                </ReportsStoreProvider>
            </TraderProviders>
        );
    };

    it('should render correct trade params for Accumulators', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.ACCUMULATOR;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.GROWTH_RATE)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.TAKE_PROFIT)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.ACCUMULATORS_INFORMATION)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(4);
    });

    it('should render correct trade params for Vanillas', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.VANILLA.CALL;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.TRADE_TYPE_TABS)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STRIKE)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(4);
    });

    it('should render correct trade params for Turbos', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.TURBOS.LONG;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.TRADE_TYPE_TABS)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.PAYOUT_PER_POINT)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.TAKE_PROFIT)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(5);
    });

    it('should render correct trade params for Multipliers', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.MULTIPLIER;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.MULTIPLIER)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.RISK_MANAGEMENT)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.MULTIPLIERS_INFORMATION)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(4);
    });

    it('should render correct trade params for Rise/Fall', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.RISE_FALL;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.ALLOW_EQUALS)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(3);
    });

    it('should render correct trade params for Higher/Lower', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.HIGH_LOW;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.BARRIER)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(3);
    });

    it('should render correct trade params for Touch/No Touch', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.TOUCH;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.BARRIER)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(3);
    });

    it('should render correct trade params for Matches/Differs', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.MATCH_DIFF;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.LAST_DIGIT_PREDICTION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(3);
    });

    it('should render correct trade params for Even/Odd', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.EVEN_ODD;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(2);
    });

    it('should render correct trade params for Over/Under', () => {
        defaultMockStore.modules.trade.contract_type = TRADE_TYPES.OVER_UNDER;
        render(mockTradeParameters());

        expect(screen.getByText(TRADE_PARAMS.LAST_DIGIT_PREDICTION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.DURATION)).toBeInTheDocument();
        expect(screen.getByText(TRADE_PARAMS.STAKE)).toBeInTheDocument();
        expect(screen.getAllByTestId(data_test)).toHaveLength(3);
    });
});
