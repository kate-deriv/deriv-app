import React from 'react';
import { Text } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import AccumulatorTradeDescription from './Description/accumulator-trade-description';
import RiseFallTradeDescription from './Description/rise-fall-trade-description';
import HighLowTradeDescription from './Description/high-low-trade-description';
import EndTradeDescription from './Description/end-trade-description';
import StayTradeDescription from './Description/stay-trade-description';
import TurbosTradeDescription from './Description/turbos-trade-description';
import EvenOddTradeDescription from './Description/even-odd-trade-description';
import MatchDiffTradeDescription from './Description/match-diff-trade-description';
import OverUnderTradeDescription from './Description/over-under-trade-description';
import TouchTradeDescription from './Description/touch-trade-description';
import AsianTradeDescription from './Description/asian-trade-description';
import RunHighLowTradeDescription from './Description/run-high-low-trade-description';
import ResetTradeDescription from './Description/reset-trade-description';

const TradeCategories = ({ category, onClick }: { category?: string; onClick: () => void }) => {
    let TradeTypeTemplate;
    if (category) {
        switch (category) {
            case 'accumulator':
                TradeTypeTemplate = <AccumulatorTradeDescription onClick={onClick} />;
                break;
            case 'rise_fall':
            case 'rise_fall_equal':
                TradeTypeTemplate = <RiseFallTradeDescription />;
                break;
            case 'high_low':
                TradeTypeTemplate = <HighLowTradeDescription />;
                break;
            case 'end':
                TradeTypeTemplate = <EndTradeDescription />;
                break;
            case 'stay':
                TradeTypeTemplate = <StayTradeDescription />;
                break;
            case 'match_diff':
                TradeTypeTemplate = <MatchDiffTradeDescription />;
                break;
            case 'even_odd':
                TradeTypeTemplate = <EvenOddTradeDescription />;
                break;
            case 'over_under':
                TradeTypeTemplate = <OverUnderTradeDescription />;
                break;
            case 'touch':
                TradeTypeTemplate = <TouchTradeDescription />;
                break;
            case 'asian':
                TradeTypeTemplate = <AsianTradeDescription />;
                break;
            case 'run_high_low':
                TradeTypeTemplate = <RunHighLowTradeDescription />;
                break;
            case 'reset':
                TradeTypeTemplate = <ResetTradeDescription />;
                break;
            case 'callputspread':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <h2>{localize('Spread Up')}</h2>
                        <Text as='p'>
                            {localize(
                                'Win maximum payout if the exit spot is higher than or equal to the upper barrier.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'Win up to maximum payout if exit spot is between lower and upper barrier, in proportion to the difference between exit spot and lower barrier.'
                            )}
                        </Text>
                        <Text as='p'>{localize('No payout if exit spot is below or equal to the lower barrier.')}</Text>
                        <h2>{localize('Spread Down')}</h2>
                        <Text as='p'>
                            {localize(
                                'Win maximum payout if the exit spot is lower than or equal to the lower barrier.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'Win up to maximum payout if exit spot is between lower and upper barrier, in proportion to the difference between upper barrier and exit spot.'
                            )}
                        </Text>
                        <Text as='p'>{localize('No payout if exit spot is above or equal to the upper barrier.')}</Text>
                    </React.Fragment>
                );
                break;
            case 'tick_high_low':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <Text as='p'>
                            {localize(
                                'If you select "High Tick", you win the payout if the selected tick is the highest among the next five ticks.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'If you select "Low Tick", you win the payout if the selected tick is the lowest among the next five ticks.'
                            )}
                        </Text>
                    </React.Fragment>
                );
                break;
            case 'lb_high_low':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <Text as='p'>
                            {localize(
                                'By purchasing the "High-to-Low" contract, you\'ll win the multiplier times the difference between the high and low over the duration of the contract.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The high is the highest point ever reached by the market during the contract period.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The low is the lowest point ever reached by the market during the contract period.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The close is the latest tick at or before the end time. If you selected a specific end time, the end time is the selected time.'
                            )}
                        </Text>
                    </React.Fragment>
                );
                break;
            case 'lb_put':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <Text as='p'>
                            {localize(
                                'By purchasing the "High-to-Close" contract, you\'ll win the multiplier times the difference between the high and close over the duration of the contract.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The high is the highest point ever reached by the market during the contract period.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The low is the lowest point ever reached by the market during the contract period.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The close is the latest tick at or before the end time. If you selected a specific end time, the end time is the selected time.'
                            )}
                        </Text>
                    </React.Fragment>
                );
                break;
            case 'lb_call':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <Text as='p'>
                            {localize(
                                'By purchasing the "Close-to-Low" contract, you\'ll win the multiplier times the difference between the close and low over the duration of the contract.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The high is the highest point ever reached by the market during the contract period.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The low is the lowest point ever reached by the market during the contract period.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The close is the latest tick at or before the end time. If you selected a specific end time, the end time is the selected time.'
                            )}
                        </Text>
                    </React.Fragment>
                );
                break;
            case 'multiplier':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <Text as='p'>
                            {localize(
                                'Predict the market direction and select either “Up” or “Down” to open a position. We will charge a commission when you open a position.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'If you select “Up”, you will earn a profit by closing your position when the market price is higher than the entry spot.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'If you select “Down”, you will earn a profit by closing your position when the market price is lower than the entry spot.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'Your profit is the percentage change in market price times your stake and the multiplier of your choice.'
                            )}
                        </Text>
                        <Text as='p'>
                            {localize(
                                'The stop-out level on the chart indicates the price at which your potential loss equals your entire stake. When the market price reaches this level, your position will be closed automatically. This ensures that your loss does not exceed the amount you paid to purchase the contract.'
                            )}
                        </Text>
                        <Text as='p'>{localize('These are optional parameters for each position that you open:')}</Text>
                        <ul>
                            <li>
                                {localize(
                                    'If you select “Take profit” and specify an amount that you’d like to earn, your position will be closed automatically when your profit is more than or equals to this amount. Your profit may be more than the amount you entered depending on the market price at closing.'
                                )}
                            </li>
                            <li>
                                {localize(
                                    'If you select “Stop loss” and specify an amount to limit your loss, your position will be closed automatically when your loss is more than or equals to this amount. Your loss may be more than the amount you entered depending on the market price at closing.'
                                )}
                            </li>
                            <li>
                                {localize(
                                    'If you select “Deal cancellation”, you’ll be able to cancel your trade within a chosen time frame should the market move against your favour. We’ll charge a small fee for this, but we’ll return your stake amount without profit or loss. If the stop-out amount is reached before the deal cancellation expires, your position will be cancelled automatically and we’ll return your stake amount without profit or loss.'
                                )}
                            </li>
                            <Text as='p'>{localize('While “Deal cancellation” is active:')}</Text>
                            <ul>
                                <li>
                                    {localize(
                                        '“Stop loss” is deactivated and will only be available when “Deal cancellation” expires.'
                                    )}
                                </li>
                                <li>
                                    {localize(
                                        '“Take profit” cannot be updated. You may update it only when “Deal cancellation” expires.'
                                    )}
                                </li>
                            </ul>
                        </ul>
                        <Text as='p'>
                            {localize(
                                'The entry spot is the market price when your contract is processed by our servers.'
                            )}
                        </Text>
                        <Text as='p'>{localize('The exit spot is the market price when the contract is closed.')}</Text>
                    </React.Fragment>
                );
                break;
            case 'turbosshort':
            case 'turboslong':
                TradeTypeTemplate = <TurbosTradeDescription />;
                break;
            case 'vanilla':
                TradeTypeTemplate = (
                    <React.Fragment>
                        <Text as='p'>
                            {localize(
                                'Vanilla options allow you to predict an upward (bullish) or downward (bearish) direction of the underlying asset by purchasing a "Call" or a "Put".'
                            )}
                        </Text>
                        <Text as='p'>
                            <Localize
                                i18n_default_text='If you select <0>"Call"</0>, you’ll earn a <1>payout</1> if the <1>final price</1> is above the <1>strike price</1> at <1>expiry</1>. Otherwise, you won’t receive a payout.'
                                components={[
                                    <strong key={0} />,
                                    <span
                                        className='contract-type-info__content-definition'
                                        onClick={onClick}
                                        key={1}
                                    />,
                                ]}
                            />
                        </Text>
                        <Text as='p'>
                            <Localize
                                i18n_default_text='If you select <0>"Put"</0>, you’ll earn a payout if the final price is below the strike price at expiry. Otherwise, you won’t receive a payout.'
                                components={[<strong key={0} />]}
                            />
                        </Text>
                        <Text as='p'>
                            <Localize
                                i18n_default_text='Your payout is equal to the <0>payout per point</0> multiplied by the difference between the final price and the strike price. You will only earn a profit if your payout is higher than your initial stake.'
                                components={[
                                    <span
                                        className='contract-type-info__content-definition'
                                        onClick={onClick}
                                        key={0}
                                    />,
                                ]}
                            />
                        </Text>
                        <Text as='p'>
                            <Localize
                                i18n_default_text='You may sell the contract up until 60 seconds before expiry. If you do, we’ll pay you the <0>contract value</0>.'
                                components={[
                                    <span
                                        className='contract-type-info__content-definition'
                                        onClick={onClick}
                                        key={0}
                                    />,
                                ]}
                            />
                        </Text>
                    </React.Fragment>
                );
                break;
            default:
                TradeTypeTemplate = <Text as='p'>{localize('Description not found.')}</Text>;
                break;
        }
    }
    return <>{TradeTypeTemplate}</>;
};

export default TradeCategories;
