import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const EndTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Ends Between", you win the payout if the exit spot is strictly higher than the Low barrier AND strictly lower than the High barrier.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Ends Outside", you win the payout if the exit spot is EITHER strictly higher than the High barrier, OR strictly lower than the Low barrier.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        "If the exit spot is equal to either the Low barrier or the High barrier, you don't win the payout."
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default EndTradeDescription;
