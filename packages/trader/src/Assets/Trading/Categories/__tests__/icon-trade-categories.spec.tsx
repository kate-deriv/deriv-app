import React from 'react';
import { render, screen } from '@testing-library/react';
import { TRADE_TYPES } from '@deriv/shared';
import IconTradeCategory from '../icon-trade-categories';

jest.mock('@deriv/components', () => ({
    ...jest.requireActual('@deriv/components'),
    Icon: jest.fn(() => 'MockedIcon'),
}));

describe('<IconTradeCatgory />', () => {
    const mocked_icon = 'MockedIcon';
    it('Expect empty div to be rendered when category is empty', () => {
        render(<IconTradeCategory category='' />);
        const categories_container = screen.getByTestId('dt-categories-container');
        expect(categories_container).toBeInTheDocument();
        expect(categories_container).toHaveClass('categories-container');
        expect(categories_container).toHaveTextContent('');
    });
    it('Expect MockedIcon to be rendered when category is rise_fall', () => {
        render(<IconTradeCategory category='rise_fall' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is rise_fall_equal', () => {
        render(<IconTradeCategory category='rise_fall_equal' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is high_low', () => {
        render(<IconTradeCategory category='high_low' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is end', () => {
        render(<IconTradeCategory category='end' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is stay', () => {
        render(<IconTradeCategory category='stay' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is match_diff', () => {
        render(<IconTradeCategory category='match_diff' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is even_odd', () => {
        render(<IconTradeCategory category='even_odd' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is over_under', () => {
        render(<IconTradeCategory category='over_under' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is touch', () => {
        render(<IconTradeCategory category='touch' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is asian', () => {
        render(<IconTradeCategory category='asian' />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect MockedIcon to be rendered when category is TRADE_TYPES.LBCALL', () => {
        render(<IconTradeCategory category={TRADE_TYPES.LBCALL} />);
        const mocked_icon_text = screen.getByText(mocked_icon);
        expect(mocked_icon_text).toBeInTheDocument();
        expect(mocked_icon_text).toHaveClass('category-wrapper');
    });
    it('Expect MockedIcon to be rendered when category is TRADE_TYPES.LBPUT', () => {
        render(<IconTradeCategory category={TRADE_TYPES.LBPUT} />);
        const mocked_icon_text = screen.getByText(mocked_icon);
        expect(mocked_icon_text).toBeInTheDocument();
        expect(mocked_icon_text).toHaveClass('category-wrapper');
    });
    it('Expect MockedIcon to be rendered when category is TRADE_TYPES.LBHIGHLOW', () => {
        render(<IconTradeCategory category={TRADE_TYPES.LBHIGHLOW} />);
        const mocked_icon_text = screen.getByText(mocked_icon);
        expect(mocked_icon_text).toBeInTheDocument();
        expect(mocked_icon_text).toHaveClass('category-wrapper');
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.RUNHIGHLOW', () => {
        render(<IconTradeCategory category={TRADE_TYPES.RUNHIGHLOW} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.RESET', () => {
        render(<IconTradeCategory category={TRADE_TYPES.RESET} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.TICKHIGHLOW', () => {
        render(<IconTradeCategory category={TRADE_TYPES.TICKHIGHLOW} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.CALLPUTSPREAD', () => {
        render(<IconTradeCategory category={TRADE_TYPES.CALLPUTSPREAD} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.MULTIPLIER', () => {
        render(<IconTradeCategory category={TRADE_TYPES.MULTIPLIER} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect MockedIcon to be rendered when category is TRADE_TYPES.ACCUMULATOR', () => {
        render(<IconTradeCategory category={TRADE_TYPES.ACCUMULATOR} />);
        const mocked_icon_text = screen.getByText(mocked_icon);
        expect(mocked_icon_text).toBeInTheDocument();
        expect(mocked_icon_text).toHaveClass('category-wrapper');
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.VANILLA.CALL', () => {
        render(<IconTradeCategory category={TRADE_TYPES.VANILLA.CALL} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect two MockedIcons to be rendered when category is TRADE_TYPES.TURBOS.LONG', () => {
        render(<IconTradeCategory category={TRADE_TYPES.TURBOS.LONG} />);
        const mocked_icons = screen.getAllByText(mocked_icon);
        expect(mocked_icons).toHaveLength(2);
        mocked_icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('category-wrapper');
        });
    });
    it('Expect default case to be rendered when category is not valid', () => {
        render(<IconTradeCategory category='some_trade_type' />);
        const mocked_icon_text = screen.getByText(mocked_icon);
        expect(mocked_icon_text).toBeInTheDocument();
        expect(mocked_icon_text).toHaveClass('category-wrapper');
    });
});
