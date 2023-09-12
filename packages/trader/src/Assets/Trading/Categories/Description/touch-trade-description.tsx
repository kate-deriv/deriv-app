import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const TouchTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Touch", you win the payout if the market touches the barrier at any time during the contract period.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "No Touch", you win the payout if the market never touches the barrier at any time during the contract period.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default TouchTradeDescription;
