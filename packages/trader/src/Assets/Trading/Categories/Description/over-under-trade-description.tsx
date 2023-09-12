import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const OverUnderTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Over", you will win the payout if the last digit of the last tick is greater than your prediction.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Under", you will win the payout if the last digit of the last tick is less than your prediction.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default OverUnderTradeDescription;
