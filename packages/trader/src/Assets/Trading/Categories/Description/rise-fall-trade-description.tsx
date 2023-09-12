import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const RiseFallTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Rise", you win the payout if the exit spot is strictly higher than the entry spot.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Fall", you win the payout if the exit spot is strictly lower than the entry spot.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Allow equals", you win the payout if exit spot is higher than or equal to entry spot for "Rise". Similarly, you win the payout if exit spot is lower than or equal to entry spot for "Fall".'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default RiseFallTradeDescription;
