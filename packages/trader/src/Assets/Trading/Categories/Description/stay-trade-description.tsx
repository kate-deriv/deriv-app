import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const StayTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Stays Between", you win the payout if the market stays between (does not touch) either the High barrier or the Low barrier at any time during the contract period'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Goes Outside", you win the payout if the market touches either the High barrier or the Low barrier at any time during the contract period.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default StayTradeDescription;
