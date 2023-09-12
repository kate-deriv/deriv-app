import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const HighLowTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Higher", you win the payout if the exit spot is strictly higher than the barrier.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Lower", you win the payout if the exit spot is strictly lower than the barrier.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize i18n_default_text={"If the exit spot is equal to the barrier, you don't win the payout."} />
            </Text>
        </React.Fragment>
    );
};

export default HighLowTradeDescription;
