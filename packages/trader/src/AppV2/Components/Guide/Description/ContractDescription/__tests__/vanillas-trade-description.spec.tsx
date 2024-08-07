import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getTerm } from 'AppV2/Utils/contract-description-utils';
import VanillasTradeDescription from '../vanillas-trade-description';

jest.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: jest.fn(() => <div>DotLottieReact</div>),
}));

describe('VanillasTradeDescription', () => {
    it('should render a proper content', () => {
        render(<VanillasTradeDescription onTermClick={jest.fn()} />);

        expect(screen.getByText(/Vanilla options allow you to predict an upward/i)).toBeInTheDocument();
    });

    it('should call onTermClick if user clicks on term "payout"', () => {
        const onTermClick = jest.fn();
        render(<VanillasTradeDescription onTermClick={onTermClick} />);

        userEvent.click(screen.getByRole('button', { name: getTerm().PAYOUT.text.toLowerCase() }));

        expect(onTermClick).toHaveBeenCalled();
    });

    it('should call onTermClick if user clicks on term "final price"', () => {
        const onTermClick = jest.fn();
        render(<VanillasTradeDescription onTermClick={onTermClick} />);

        userEvent.click(screen.getByRole('button', { name: getTerm().FINAL_PRICE.text.toLowerCase() }));

        expect(onTermClick).toHaveBeenCalled();
    });

    it('should call onTermClick if user clicks on term "strike price"', () => {
        const onTermClick = jest.fn();
        render(<VanillasTradeDescription onTermClick={onTermClick} />);

        userEvent.click(screen.getByRole('button', { name: getTerm().STRIKE_PRICE.text.toLowerCase() }));

        expect(onTermClick).toHaveBeenCalled();
    });

    it('should call onTermClick if user clicks on term "expiry"', () => {
        const onTermClick = jest.fn();
        render(<VanillasTradeDescription onTermClick={onTermClick} />);

        userEvent.click(screen.getByRole('button', { name: getTerm().EXPIRY.text.toLowerCase() }));

        expect(onTermClick).toHaveBeenCalled();
    });

    it('should call onTermClick if user clicks on term "payout per point"', () => {
        const onTermClick = jest.fn();
        render(<VanillasTradeDescription onTermClick={onTermClick} />);

        userEvent.click(screen.getByRole('button', { name: getTerm().PAYOUT_PER_POINT.text.toLowerCase() }));

        expect(onTermClick).toHaveBeenCalled();
    });

    it('should call onTermClick if user clicks on term "contract value"', () => {
        const onTermClick = jest.fn();
        render(<VanillasTradeDescription onTermClick={onTermClick} />);

        userEvent.click(screen.getByRole('button', { name: getTerm().CONTRACT_VALUE.text.toLowerCase() }));

        expect(onTermClick).toHaveBeenCalled();
    });
});
