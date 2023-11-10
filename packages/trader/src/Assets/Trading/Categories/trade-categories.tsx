import React from 'react';
import { Text } from '@deriv/components';
import { TRADE_TYPES } from '@deriv/shared';
import { Localize } from '@deriv/translations';
import AccumulatorTradeDescription from './Description/accumulator-trade-description';
import AsianTradeDescription from './Description/asian-trade-description';
import CallPutSpreadTradeDescription from './Description/call-put-spread-trade-description';
import EndTradeDescription from './Description/end-trade-description';
import EvenOddTradeDescription from './Description/even-odd-trade-description';
import HighLowTradeDescription from './Description/high-low-trade-description';
import LbHighLowTradeDescription from './Description/lb-high-low-trade-description';
import LbPutTradeDescription from './Description/lb-put-trade-description';
import LbCallTradeDescription from './Description/lb-call-trade-description';
import MatchDiffTradeDescription from './Description/match-diff-trade-description';
import MultiplierTradeDescription from './Description/multiplier-trade-description';
import OverUnderTradeDescription from './Description/over-under-trade-description';
import RiseFallTradeDescription from './Description/rise-fall-trade-description';
import RunHighLowTradeDescription from './Description/run-high-low-trade-description';
import ResetTradeDescription from './Description/reset-trade-description';
import StayTradeDescription from './Description/stay-trade-description';
import TurbosTradeDescription from './Description/turbos-trade-description';
import TouchTradeDescription from './Description/touch-trade-description';
import TickHighLowTradeDescription from './Description/tick-high-low-trade-description';
import VanillaTradeDescription from './Description/vanilla-trade-description';

const TradeCategories = ({
    category,
    onClick,
    is_vanilla_fx = false,
    is_multiplier_fx = false,
}: {
    category?: string;
    onClick: React.MouseEventHandler<HTMLSpanElement>;
    is_vanilla_fx?: boolean;
    is_multiplier_fx?: boolean;
}) => {
    let TradeTypeTemplate;
    if (category) {
        switch (category) {
            case TRADE_TYPES.ACCUMULATOR:
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
            case TRADE_TYPES.RUNHIGHLOW:
                TradeTypeTemplate = <RunHighLowTradeDescription />;
                break;
            case TRADE_TYPES.RESET:
                TradeTypeTemplate = <ResetTradeDescription />;
                break;
            case TRADE_TYPES.CALLPUTSPREAD:
                TradeTypeTemplate = <CallPutSpreadTradeDescription />;
                break;
            case TRADE_TYPES.TICKHIGHLOW:
                TradeTypeTemplate = <TickHighLowTradeDescription />;
                break;
            case TRADE_TYPES.LBHIGHLOW:
                TradeTypeTemplate = <LbHighLowTradeDescription />;
                break;
            case 'lb_put':
                TradeTypeTemplate = <LbPutTradeDescription />;
                break;
            case 'lb_call':
                TradeTypeTemplate = <LbCallTradeDescription />;
                break;
            case TRADE_TYPES.MULTIPLIER:
                TradeTypeTemplate = (
                    <MultiplierTradeDescription is_multiplier_fx={is_multiplier_fx} onClick={onClick} />
                );
                break;
            case TRADE_TYPES.TURBOS.LONG:
            case TRADE_TYPES.TURBOS.SHORT:
                TradeTypeTemplate = <TurbosTradeDescription onClick={onClick} />;
                break;
            case TRADE_TYPES.VANILLA.CALL:
            case TRADE_TYPES.VANILLA.PUT:
                TradeTypeTemplate = <VanillaTradeDescription is_vanilla_fx={is_vanilla_fx} onClick={onClick} />;
                break;
            default:
                TradeTypeTemplate = (
                    <Text as='p'>
                        <Localize i18n_default_text='Description not found.' />
                    </Text>
                );
                break;
        }
    }
    return <>{TradeTypeTemplate}</>;
};

export default TradeCategories;
