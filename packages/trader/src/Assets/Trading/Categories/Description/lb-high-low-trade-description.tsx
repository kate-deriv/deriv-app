import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const LbHighLowTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'By purchasing the "High-to-Low" contract, you\'ll win the multiplier times the difference between the high and low over the duration of the contract.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'The high is the highest point ever reached by the market during the contract period.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'The low is the lowest point ever reached by the market during the contract period.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'The close is the latest tick at or before the end time. If you selected a specific end time, the end time is the selected time.'
                    }
                />
            </Text>
        </React.Fragment>
    );
};

export default LbHighLowTradeDescription;
