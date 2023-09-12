import React from 'react';
import { Localize } from '@deriv/translations';
import { Text } from '@deriv/components';

const MultiplierTradeDescription = () => {
    return (
        <React.Fragment>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'Predict the market direction and select either “Up” or “Down” to open a position. We will charge a commission when you open a position.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select “Up”, you will earn a profit by closing your position when the market price is higher than the entry spot.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'If you select “Down”, you will earn a profit by closing your position when the market price is lower than the entry spot.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'Your profit is the percentage change in market price times your stake and the multiplier of your choice.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'The stop-out level on the chart indicates the price at which your potential loss equals your entire stake. When the market price reaches this level, your position will be closed automatically. This ensures that your loss does not exceed the amount you paid to purchase the contract.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize i18n_default_text={'These are optional parameters for each position that you open:'} />
            </Text>
            <ul>
                <Text as='li'>
                    <Localize
                        i18n_default_text={
                            'If you select “Take profit” and specify an amount that you’d like to earn, your position will be closed automatically when your profit is more than or equals to this amount. Your profit may be more than the amount you entered depending on the market price at closing.'
                        }
                    />
                </Text>
                <Text as='li'>
                    <Localize
                        i18n_default_text={
                            'If you select “Stop loss” and specify an amount to limit your loss, your position will be closed automatically when your loss is more than or equals to this amount. Your loss may be more than the amount you entered depending on the market price at closing.'
                        }
                    />
                </Text>
                <Text as='li'>
                    <Localize
                        i18n_default_text={
                            'If you select “Deal cancellation”, you’ll be able to cancel your trade within a chosen time frame should the market move against your favour. We’ll charge a small fee for this, but we’ll return your stake amount without profit or loss. If the stop-out amount is reached before the deal cancellation expires, your position will be cancelled automatically and we’ll return your stake amount without profit or loss.'
                        }
                    />
                </Text>
                <Text as='p'>
                    <Localize i18n_default_text={'While “Deal cancellation” is active:'} />
                </Text>
                <ul>
                    <Text as='li'>
                        <Localize
                            i18n_default_text={
                                '“Stop loss” is deactivated and will only be available when “Deal cancellation” expires.'
                            }
                        />
                    </Text>
                    <Text as='li'>
                        <Localize
                            i18n_default_text={
                                '“Take profit” cannot be updated. You may update it only when “Deal cancellation” expires.'
                            }
                        />
                    </Text>
                </ul>
            </ul>
            <Text as='p'>
                <Localize
                    i18n_default_text={
                        'The entry spot is the market price when your contract is processed by our servers.'
                    }
                />
            </Text>
            <Text as='p'>
                <Localize i18n_default_text={'The exit spot is the market price when the contract is closed.'} />
            </Text>
        </React.Fragment>
    );
};

export default MultiplierTradeDescription;
