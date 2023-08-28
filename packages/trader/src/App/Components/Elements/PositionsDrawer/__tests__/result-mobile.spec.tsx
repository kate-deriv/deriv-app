import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultMobile from '../result-mobile';

describe('ResultMobile', () => {
    it('should ResultMobile be in the DOM', () => {
        render(<ResultMobile is_visible={true} />);
        expect(screen.getByTestId('result_mobile')).toBeInTheDocument();
    });

    it('should ResultMobile render LOST if result is won ', () => {
        render(<ResultMobile is_visible={true} result='won' />);
        expect(screen.getByText('Won')).toBeInTheDocument();
    });

    it('should ResultMobile render LOST if result is not won ', () => {
        render(<ResultMobile is_visible={true} result='lost' />);
        expect(screen.getByText('Lost')).toBeInTheDocument();
    });
});
