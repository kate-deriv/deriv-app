import React from 'react';
import { render, screen } from '@testing-library/react';
import ContractTypeGlossary from '../ContractTypeInfo/contract-type-glossary';

describe('<ContractTypeGlossary />', () => {
    it('Ensure accumulator glossary is rendered properly', () => {
        render(<ContractTypeGlossary category='accumulator' />);

        expect(
            screen.getByText(/You can choose a growth rate with values of 1%, 2%, 3%, 4%, and 5%./i)
        ).toBeInTheDocument();
    });
    it('Ensure vanilla glossary is rendered properly', () => {
        render(<ContractTypeGlossary category='vanillalongcall' />);

        expect(
            screen.getByText(/Contracts will expire at exactly 23:59:59 GMT on your selected expiry date./i)
        ).toBeInTheDocument();
    });
    it('Ensure multiplier glossary is rendered properly if it is synthetic', () => {
        render(<ContractTypeGlossary category='multiplier' />);

        expect(screen.getByText('Deal cancellation')).toBeInTheDocument();
        expect(screen.getByText(/Stop out/i)).toBeInTheDocument();
    });
    it('Ensure multiplier glossary is rendered properly if it is fx', () => {
        render(<ContractTypeGlossary category='multiplier' is_multiplier_fx />);

        expect(screen.queryByText('Deal cancellation')).not.toBeInTheDocument();
        expect(screen.getByText(/Stop out/i)).toBeInTheDocument();
    });
    it('Ensure placeholder text is rendered if category does not exist', () => {
        const { container } = render(<ContractTypeGlossary category='test' />);

        expect(container).toBeEmptyDOMElement();
    });
});
