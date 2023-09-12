import React from 'react';
import { Text } from '@deriv/components';
import { localize } from '@deriv/translations';
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
import CallPutSpreadTradeDescription from './Description/call-put-spread-trade-description';
import TickHighLowTradeDescription from './Description/tick-high-low-trade-description';
import LbHighLowTradeDescription from './Description/lb-high-low-trade-description';
import LbPutTradeDescription from './Description/lb-put-trade-desciption';
import LbCallTradeDescription from './Description/lb-call-trade-description';
import VanillaTradeDescription from './Description/vanilla-trade-description';

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
                TradeTypeTemplate = <CallPutSpreadTradeDescription />;
                break;
            case 'tick_high_low':
                TradeTypeTemplate = <TickHighLowTradeDescription />;
                break;
            case 'lb_high_low':
                TradeTypeTemplate = <LbHighLowTradeDescription />;
                break;
            case 'lb_put':
                TradeTypeTemplate = <LbPutTradeDescription />;
                break;
            case 'lb_call':
                TradeTypeTemplate = <LbCallTradeDescription />;
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
                TradeTypeTemplate = <VanillaTradeDescription onClick={onClick} />;
                break;
            default:
                TradeTypeTemplate = <Text as='p'>{localize('Description not found.')}</Text>;
                break;
        }
    }
    return <>{TradeTypeTemplate}</>;
};

export default TradeCategories;
