import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContractAudit from '../contract-audit';

const mocked_default_props = {
    contract_info: { contract_id: 'test_id', currency: 'test_currency' },
    contract_update_history: [{ order_date: '20' }, { order_date: '10' }],
    has_result: true,
    is_multiplier: true,
    is_accumulator: false,
    is_turbos: false,
    toggleHistoryTab: jest.fn(),
} as unknown as React.ComponentProps<typeof ContractAudit>;

jest.mock('@deriv/components', () => ({
    ...jest.requireActual('@deriv/components'),
    Tabs: jest.fn(({ onTabItemClick, children }) => <div onClick={() => onTabItemClick(0)}>{children}</div>),
}));
jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    WS: { contractUpdateHistory: jest.fn() },
}));
jest.mock('../contract-details', () => jest.fn(() => <div>ContractDetails</div>));
jest.mock('../contract-history', () => jest.fn(() => <div>ContractHistory</div>));

describe('<ContractAudit />', () => {
    it('should not render component if has_result is falsy', () => {
        const { container } = render(<ContractAudit {...mocked_default_props} has_result={false} />);

        expect(container).toBeEmptyDOMElement();
    });
    it('should render only ContractDetails component if is_multiplier, is_accumulator and is_turbos are falsy', () => {
        render(<ContractAudit {...mocked_default_props} is_multiplier={false} />);

        expect(screen.getByText(/ContractDetails/i)).toBeInTheDocument();
        expect(screen.queryByText(/ContractHistory/i)).not.toBeInTheDocument();
    });
    it('should render ContractDetails and ContractHistory components if is_multiplier, is_accumulator or is_turbos are truthy', () => {
        render(<ContractAudit {...mocked_default_props} />);

        expect(screen.getByText(/ContractDetails/i)).toBeInTheDocument();
        expect(screen.getByText(/ContractHistory/i)).toBeInTheDocument();
    });
    it('should call toggleHistoryTab function if the user clicks on tab with falsy index', () => {
        render(<ContractAudit {...mocked_default_props} />);

        userEvent.click(screen.getByText(/ContractDetails/i));

        expect(mocked_default_props.toggleHistoryTab).toBeCalled();
    });
});
