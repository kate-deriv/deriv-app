import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const TickHighLowTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "High Tick", you win the payout if the selected tick is the highest among the next five ticks.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Low Tick", you win the payout if the selected tick is the lowest among the next five ticks.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default TickHighLowTradeDescription;
