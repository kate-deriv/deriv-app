import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Money, Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';

const getTextForStake = (amount_of_stake, className, currency, text) => (
    <Text
        as='p'
        line_height='s'
        size='xxxs'
        className={classNames({
            [`${className}-tooltip-text`]: className,
        })}
    >
        <Localize
            i18n_default_text={text}
            components={[<Money key={0} amount={amount_of_stake} currency={currency} show_currency />]}
        />
    </Text>
);

const TurbosInfo = ({ className, currency, has_stop_loss, max_stake, min_stake }) => {
    return (
        <div className={classNames('turbos-trade-info', className)}>
            {getTextForStake(min_stake, className, currency, 'Min. stake <0/>')}
            {!has_stop_loss && getTextForStake(max_stake, className, currency, 'Max. stake <0/>')}
        </div>
    );
};

TurbosInfo.propTypes = {
    amount: PropTypes.number,
    className: PropTypes.string,
    currency: PropTypes.string,
    has_stop_loss: PropTypes.bool,
    max_stake: PropTypes.number,
    min_stake: PropTypes.number,
};

export default connect(({ modules }, props) => ({
    amount: props.amount ?? modules.trade.amount,
    currency: modules.trade.currency,
    has_stop_loss: modules.trade.has_stop_loss,
    max_stake: props.max_stake ?? modules.trade.max_stake,
    min_stake: props.min_stake ?? modules.trade.min_stake,
}))(TurbosInfo);
