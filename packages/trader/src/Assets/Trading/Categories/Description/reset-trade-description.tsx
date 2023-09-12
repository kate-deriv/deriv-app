import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const ResetTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Reset-Up”, you win the payout if the exit spot is strictly higher than either the entry spot or the spot at reset time.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Reset-Down”, you win the payout if the exit spot is strictly lower than either the entry spot or the spot at reset time.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        "If the exit spot is equal to the barrier or the new barrier (if a reset occurs), you don't win the payout."
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default ResetTradeDescription;
