import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockStore } from '@deriv/stores';
import { CONTRACT_TYPES, TRADE_TYPES } from '@deriv/shared';
import ModulesProvider from 'Stores/Providers/modules-providers';
import TraderProviders from '../../../../../trader-providers';
import Strike from '../strike';

const strike_trade_param_label = 'Strike price';
const data_testid_strike = 'dt_strike_wrapper';

const mediaQueryList = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
};
window.matchMedia = jest.fn().mockImplementation(() => mediaQueryList);

jest.mock('@deriv-com/quill-ui', () => ({
    ...jest.requireActual('@deriv-com/quill-ui'),
    WheelPicker: jest.fn(({ data, setSelectedValue }) => (
        <div>
            <p>WheelPicker</p>
            <ul>
                {data.map(({ value }: { value: string }) => (
                    <li key={value} onClick={() => setSelectedValue(value)}>
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    )),
}));

describe('Strike', () => {
    let default_mock_store: ReturnType<typeof mockStore>;

    beforeEach(
        () =>
            (default_mock_store = mockStore({
                modules: {
                    trade: {
                        ...mockStore({}),
                        barrier_1: '+1.80',
                        barrier_choices: ['+1.80', '+1.00', '+0.00', '-1.00', '-1.80'],
                        contract_type: TRADE_TYPES.VANILLA.CALL,
                        currency: 'USD',
                        proposal_info: {
                            [CONTRACT_TYPES.VANILLA.CALL]: { obj_contract_basis: { value: '14.245555' } },
                        },
                    },
                },
            }))
    );

    afterEach(() => jest.clearAllMocks());

    const mockStrike = () =>
        render(
            <TraderProviders store={default_mock_store}>
                <ModulesProvider store={default_mock_store}>
                    <Strike is_minimized />
                </ModulesProvider>
            </TraderProviders>
        );

    it('should render trade param with "Strike" label and passed current strike value (barrier_1)', () => {
        mockStrike();

        const strike_trade_param = screen.getByRole('textbox');

        expect(strike_trade_param).toBeInTheDocument();
        expect(strike_trade_param).toHaveValue('+1.80');
        expect(screen.getByText(strike_trade_param_label)).toBeInTheDocument();
    });

    it('should open ActionSheet with WheelPicker component, Payout per point information, "Save" button and text content with definition if user clicks on trade param', () => {
        mockStrike();

        expect(screen.queryByTestId('dt-actionsheet-overlay')).not.toBeInTheDocument();

        userEvent.click(screen.getByText(strike_trade_param_label));

        expect(screen.getByTestId('dt-actionsheet-overlay')).toBeInTheDocument();
        expect(screen.getByText('WheelPicker')).toBeInTheDocument();
        expect(screen.getByText('Payout per point:')).toBeInTheDocument();
        expect(screen.getByText(/14.245555/)).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Content goes here.')).toBeInTheDocument();
    });

    it('should not render Payout per point information if proposal_info is empty object', () => {
        default_mock_store.modules.trade.proposal_info = {};
        mockStrike();

        userEvent.click(screen.getByText(strike_trade_param_label));

        expect(screen.getByText('Payout per point:')).toBeInTheDocument();
        expect(screen.queryByText(/14.245555/)).not.toBeInTheDocument();
    });

    it('should apply specific className if innerHeight is <= 640px', () => {
        const original_height = window.innerHeight;
        window.innerHeight = 640;
        mockStrike();

        userEvent.click(screen.getByText(strike_trade_param_label));

        expect(screen.getByTestId(data_testid_strike)).toHaveClass('strike__wrapper--small-screen');
        window.innerHeight = original_height;
    });

    it('should not call onChange function if user clicks on save button, but new selected value is equal to current one', () => {
        mockStrike();

        userEvent.click(screen.getByText(strike_trade_param_label));
        userEvent.click(screen.getByText('Save'));

        expect(default_mock_store.modules.trade.onChange).not.toBeCalled();
    });

    it('should call onChange function if user clicks on save button and new selected value is not equal to current one', () => {
        mockStrike();

        const new_selected_value = default_mock_store.modules.trade.barrier_choices[1];
        userEvent.click(screen.getByText(strike_trade_param_label));
        userEvent.click(screen.getByText(new_selected_value));
        userEvent.click(screen.getByText('Save'));

        expect(default_mock_store.modules.trade.onChange).toBeCalled();
    });
});
