import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { StoreProvider, mockStore } from '@deriv/stores';
import { createBrowserHistory } from 'history';
import Contract from '../contract';

jest.mock('App/Components/Elements/Errors', () => jest.fn(() => <div>Error Component</div>));
jest.mock('../contract-replay', () => jest.fn(() => <div>Contract Replay</div>));
jest.mock('react-transition-group', () => ({
    ...jest.requireActual('react-transition-group'),
    CSSTransition: jest.fn(({ children }) => children),
}));
// jest.mock('react-router', () => ({
//     ...jest.requireActual('react-router'),
//     match: {
//         isExact: true,
//         params: { contract_id: '229446182048' },
//         path: '/contract/:contract_id',
//         url: '/contract/229446182048',
//     },
// }));

describe('<Contract />', () => {
    let default_mocked_store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        default_mocked_store = mockStore({});
    });

    const withRouter = (Component: React.ComponentType) => {
        const match = {
            isExact: true,
            params: { contract_id: '229446182048' },
            path: '/contract/:contract_id',
            url: '/contract/229446182048',
        };
        const history = { ...createBrowserHistory(), match };
        const WrapperComponent = () => (
            <Router history={history}>
                <Component />
            </Router>
        );

        return WrapperComponent;
    };
    const ContractComponent = withRouter(Contract);

    const mockContract = () => {
        return (
            <StoreProvider store={default_mocked_store}>
                <ContractComponent />
            </StoreProvider>
        );
    };

    it('should', () => {
        render(mockContract());

        // screen.debug();
    });
});
