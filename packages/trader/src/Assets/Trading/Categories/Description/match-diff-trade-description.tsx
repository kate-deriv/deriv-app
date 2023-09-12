import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const MatchDiffTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Matches", you will win the payout if the last digit of the last tick is the same as your prediction.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Differs", you will win the payout if the last digit of the last tick is not the same as your prediction.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default MatchDiffTradeDescription;
