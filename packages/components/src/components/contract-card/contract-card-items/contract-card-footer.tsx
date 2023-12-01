import classNames from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {
    isValidToCancel,
    isValidToSell,
    hasContractEntered,
    isOpen,
    useNewRowTransition,
    TContractInfo,
} from '@deriv/shared';
import { Localize } from '@deriv/translations';
import ContractCardSell from './contract-card-sell';
import MultiplierCloseActions from './multiplier-close-actions';
import { TGetCardLables } from '../../types';
import Text from '../../text';

export type TCardFooterPropTypes = {
    contract_info: TContractInfo;
    getCardLabels: TGetCardLables;
    is_multiplier?: boolean;
    is_positions?: boolean;
    is_sell_requested: boolean;
    is_lookbacks?: boolean;
    onClickCancel: (contract_id?: number) => void;
    onClickSell: (contract_id?: number) => void;
    onFooterEntered?: () => void;
    server_time: moment.Moment;
    should_show_transition?: boolean;
};

const CardFooter = ({
    contract_info,
    getCardLabels,
    is_multiplier,
    is_positions,
    is_sell_requested,
    is_lookbacks,
    onClickCancel,
    onClickSell,
    onFooterEntered,
    server_time,
    should_show_transition,
}: TCardFooterPropTypes) => {
    const { in_prop } = useNewRowTransition(!!should_show_transition);

    const is_valid_to_cancel = isValidToCancel(contract_info);

    const should_show_sell = hasContractEntered(contract_info) && isOpen(contract_info);

    const is_valid_to_sell = isValidToSell(contract_info);

    if (!should_show_sell) return null;

    return (
        <CSSTransition
            in={in_prop}
            timeout={should_show_transition ? 250 : 0}
            classNames={
                should_show_transition
                    ? {
                          enter: 'dc-contract-card__sell-button--enter',
                          enterDone: 'dc-contract-card__sell-button--enter-done',
                          exit: 'dc-contract-card__sell-button--exit',
                      }
                    : {}
            }
            onEntered={onFooterEntered}
            unmountOnExit
        >
            <div className='dc-contract-card-item__footer'>
                {is_multiplier ? (
                    <div
                        className={classNames('dc-contract-card__sell-button', {
                            'dc-contract-card__sell-button--has-cancel-btn': is_valid_to_cancel,
                            'dc-contract-card__sell-button--positions': is_positions,
                        })}
                    >
                        <MultiplierCloseActions
                            className='dc-btn--sell'
                            contract_info={contract_info}
                            getCardLabels={getCardLabels}
                            is_sell_requested={is_sell_requested}
                            onClickCancel={onClickCancel}
                            onClickSell={onClickSell}
                            server_time={server_time}
                        />
                    </div>
                ) : (
                    <React.Fragment>
                        <div
                            className={classNames('dc-contract-card__sell-button', {
                                'dc-contract-card__sell-button--positions': is_positions,
                            })}
                        >
                            <ContractCardSell
                                contract_info={contract_info}
                                is_sell_requested={is_sell_requested}
                                getCardLabels={getCardLabels}
                                onClickSell={onClickSell}
                            />
                        </div>
                        {is_lookbacks && is_valid_to_sell && should_show_sell && (
                            <Text as='div' size='xxxs' color='less-prominent' line_height='s'>
                                <Localize
                                    i18n_default_text='<0>Note:</0> Contract will be sold at the prevailing market price when the request is received by our servers. This price may differ from the indicated price.'
                                    components={[<strong key={0} />]}
                                />
                            </Text>
                        )}
                    </React.Fragment>
                )}
            </div>
        </CSSTransition>
    );
};

export default CardFooter;
