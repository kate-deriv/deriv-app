import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const AsianTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'Asian options settle by comparing the last tick with the average spot over the period.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Asian Rise", you will win the payout if the last tick is higher than the average of the ticks.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select "Asian Fall", you will win the payout if the last tick is lower than the average of the ticks.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        "If the last tick is equal to the average of the ticks, you don't win the payout."
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default AsianTradeDescription;
