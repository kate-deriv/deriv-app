import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const RunHighLowTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Only Ups", you win the payout if consecutive ticks rise successively after the entry spot. No payout if any tick falls or is equal to any of the previous ticks.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Only Downs", you win the payout if consecutive ticks fall successively after the entry spot. No payout if any tick rises or is equal to any of the previous ticks.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default RunHighLowTradeDescription;
