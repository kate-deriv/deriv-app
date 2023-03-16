import classNames from 'classnames';
import React from 'react';
import { isCryptocurrency, getLimitOrderAmount, getTotalProfit, isValidToSell } from '@deriv/shared';
import ContractCardItem from './contract-card-item.jsx';
import ToggleCardDialog from './toggle-card-dialog.jsx';
import Icon from '../../icon';
import MobileWrapper from '../../mobile-wrapper';
import Money from '../../money';
import { ResultStatusIcon } from '../result-overlay/result-overlay.jsx';
import { TContractInfo, TGetContractUpdateConfig } from '@deriv/shared/src/utils/contract/contract-types';
import { TContractStore } from '@deriv/shared/src/utils/helpers/validation-rules';

type TToastConfig = {
    key?: string;
    content: string;
    timeout?: number;
    is_bottom?: boolean;
    type: string;
};

type TTurbosCardBody = {
    addToast: (toast_config: TToastConfig) => void;
    connectWithContractUpdate?: (Component: React.ComponentType) => React.ComponentType;
    contract_info: TContractInfo;
    contract_update?: TGetContractUpdateConfig['contract_update'];
    currency: string;
    current_focus?: string | null;
    error_message_alignment?: string;
    getCardLabels: () => { [key: string]: string };
    getContractById: (contract_id: number) => TContractStore;
    is_sold: boolean;
    is_open_positions?: boolean;
    onMouseLeave: () => void;
    removeToast: (key: string) => void;
    progress_slider_mobile_el: React.ReactNode;
    setCurrentFocus: (value: string | null) => void;
    status: string | null;
};

const TurbosCardBody = ({
    addToast,
    connectWithContractUpdate,
    contract_info,
    contract_update,
    currency,
    current_focus,
    error_message_alignment,
    getCardLabels,
    getContractById,
    is_sold,
    is_open_positions,
    onMouseLeave,
    removeToast,
    progress_slider_mobile_el,
    setCurrentFocus,
    status,
}: TTurbosCardBody) => {
    const total_profit = getTotalProfit(contract_info);
    const { buy_price, profit, barrier, current_spot_display_value, sell_spot, entry_spot } = contract_info;
    const { take_profit } = contract_update ? getLimitOrderAmount(contract_update) : { take_profit: null };
    const is_valid_to_sell = isValidToSell(contract_info);
    const {
        BARRIER_LEVEL,
        BUY_PRICE,
        CURRENT_PRICE,
        STAKE,
        TAKE_PROFIT,
        TOTAL_PROFIT_LOSS,
        PAYOUT,
        PROFIT_LOSS,
        POTENTIAL_PROFIT_LOSS,
    } = getCardLabels();

    return (
        <React.Fragment>
            <div
                className={classNames('dc-contract-card-items-wrapper dc-contract-card--turbos', {
                    'dc-contract-card--turbos-open-positions': is_open_positions,
                })}
            >
                <ContractCardItem
                    className='dc-contract-card__stake'
                    header={is_sold ? PROFIT_LOSS : STAKE}
                    is_crypto={isCryptocurrency(currency)}
                    is_loss={is_sold ? +profit < 0 : false}
                    is_won={is_sold ? +profit > 0 : false}
                >
                    <Money amount={buy_price} currency={currency} />
                </ContractCardItem>
                <ContractCardItem header={is_sold ? PAYOUT : CURRENT_PRICE} className='dc-contract-card__current-price'>
                    <Money currency={currency} amount={sell_spot || current_spot_display_value} />
                </ContractCardItem>
                <ContractCardItem
                    header={is_sold ? BUY_PRICE : BARRIER_LEVEL}
                    is_crypto={isCryptocurrency(currency)}
                    className={is_open_positions ? 'dc-contract-card__barrier-level' : 'dc-contract-card__buy-price'}
                >
                    <Money amount={is_sold ? entry_spot : barrier} currency={currency} />
                </ContractCardItem>

                {!is_open_positions && (
                    <>
                        {is_sold ? (
                            <ContractCardItem header={BARRIER_LEVEL} className='dc-contract-card__barrier-level'>
                                <Money amount={barrier} currency={currency} />
                            </ContractCardItem>
                        ) : (
                            <div className='dc-contract-card__limit-order-info'>
                                <ContractCardItem header={TAKE_PROFIT} className='dc-contract-card__take-profit'>
                                    {take_profit ? (
                                        <Money amount={take_profit} currency={currency} />
                                    ) : (
                                        <strong>-</strong>
                                    )}
                                    {is_valid_to_sell && (
                                        <ToggleCardDialog
                                            addToast={addToast}
                                            connectWithContractUpdate={connectWithContractUpdate}
                                            contract_id={contract_info.contract_id}
                                            current_focus={current_focus}
                                            error_message_alignment={error_message_alignment}
                                            getCardLabels={getCardLabels}
                                            getContractById={getContractById}
                                            is_turbos
                                            onMouseLeave={onMouseLeave}
                                            removeToast={removeToast}
                                            setCurrentFocus={setCurrentFocus}
                                            status={status}
                                        />
                                    )}
                                </ContractCardItem>
                            </div>
                        )}
                        <MobileWrapper>
                            <div className='dc-contract-card__status'>
                                {is_sold ? (
                                    <ResultStatusIcon getCardLabels={getCardLabels} is_contract_won={+profit > 0} />
                                ) : (
                                    progress_slider_mobile_el
                                )}
                            </div>
                        </MobileWrapper>
                    </>
                )}
                {is_open_positions && (
                    <>
                        {!is_sold && (
                            <ContractCardItem
                                header={POTENTIAL_PROFIT_LOSS}
                                is_crypto={isCryptocurrency(currency)}
                                is_loss={+total_profit < 0}
                                is_won={+total_profit > 0}
                                className='dc-contract-card__buy-price'
                            >
                                <div
                                    className={classNames({
                                        'dc-contract-card__buy-price--positive': total_profit > 0,
                                        'dc-contract-card__buy-price--negative': total_profit < 0,
                                    })}
                                >
                                    <Money amount={total_profit} currency={currency} />
                                </div>
                                <div
                                    className={classNames('dc-contract-card__indicative--movement', {
                                        'dc-contract-card__indicative--movement-complete': is_sold,
                                    })}
                                >
                                    {total_profit > 0 && <Icon icon='IcProfit' />}
                                    {total_profit < 0 && <Icon icon='IcLoss' />}
                                </div>
                            </ContractCardItem>
                        )}
                        <div className='dc-contract-card__limit-order-info'>
                            <ContractCardItem header={TAKE_PROFIT} className='dc-contract-card__take-profit'>
                                {take_profit ? <Money amount={take_profit} currency={currency} /> : <strong>-</strong>}
                                {is_valid_to_sell && (
                                    <ToggleCardDialog
                                        addToast={addToast}
                                        connectWithContractUpdate={connectWithContractUpdate}
                                        contract_id={contract_info.contract_id}
                                        current_focus={current_focus}
                                        error_message_alignment={error_message_alignment}
                                        getCardLabels={getCardLabels}
                                        getContractById={getContractById}
                                        is_turbos
                                        onMouseLeave={onMouseLeave}
                                        removeToast={removeToast}
                                        setCurrentFocus={setCurrentFocus}
                                        status={status}
                                    />
                                )}
                            </ContractCardItem>
                        </div>
                    </>
                )}
            </div>
            {!is_sold && !is_open_positions && (
                <ContractCardItem
                    className='dc-contract-card-item__total-profit-loss'
                    header={TOTAL_PROFIT_LOSS}
                    is_crypto={isCryptocurrency(currency)}
                    is_loss={+total_profit < 0}
                    is_won={+total_profit > 0}
                >
                    <Money amount={total_profit} currency={currency} />
                    <div
                        className={classNames('dc-contract-card__indicative--movement', {
                            'dc-contract-card__indicative--movement-complete': is_sold,
                        })}
                    >
                        {status === 'profit' && <Icon icon='IcProfit' />}
                        {status === 'loss' && <Icon icon='IcLoss' />}
                    </div>
                </ContractCardItem>
            )}
        </React.Fragment>
    );
};

export default React.memo(TurbosCardBody);
