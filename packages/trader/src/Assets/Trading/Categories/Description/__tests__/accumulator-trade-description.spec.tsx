import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccumulatorTradeDescription from '../accumulator-trade-description';

const mocked_props = {
    onClick: jest.fn(),
};

describe('<AccumulatorTradeDescription />', () => {
    it('a proper text of description should be rendered', () => {
        render(<AccumulatorTradeDescription {...mocked_props} />);

        expect(screen.getByText(/Accumulators allow you to express/i)).toBeInTheDocument();
    });

    it('should call a function if word from vocabulary was clicked', () => {
        render(<AccumulatorTradeDescription {...mocked_props} />);

        const vocabulary_word = screen.getByText(/growth rate/i);
        userEvent.click(vocabulary_word);

        expect(mocked_props.onClick).toBeCalled();
    });
});
