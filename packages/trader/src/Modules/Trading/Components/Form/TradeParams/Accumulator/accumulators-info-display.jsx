import PropTypes from 'prop-types';
import React from 'react';
import { localize } from '@deriv/translations';
import Fieldset from 'App/Components/Form/fieldset.jsx';
import { connect } from 'Stores/connect';
import { Money, Text, Popover } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import classNames from 'classnames';

const AccumulatorsInfoDisplay = ({ currency, maximum_payout, maximum_ticks }) => {
    const content = [
        {
            label: localize('Max. payout'),
            value: <Money amount={maximum_payout} show_currency currency={currency} />,
            tooltip_text: localize('Your contract will be automatically closed when your payout reaches this amount.'),
        },
        {
            label: localize('Max. ticks'),
            value: `${maximum_ticks || 0} ${maximum_ticks === 1 ? localize('tick') : localize('ticks')}`,
            tooltip_text: localize('Your contract will be automatically closed upon reaching this number of ticks.'),
        },
    ];

    return (
        <Fieldset className={classNames('trade-container__fieldset', 'accu-info-display')}>
            {content.map(({ label, value, tooltip_text }) => (
                <div key={label} className='accu-info-display__row'>
                    <Text size='xxs' weight='bold' line_height='xxs'>
                        {label}
                    </Text>
                    <Text size='xxs' align='right' as='div'>
                        {value}
                        <Popover
                            alignment='left'
                            icon='info'
                            is_bubble_hover_enabled
                            message={tooltip_text}
                            margin={isMobile() ? 0 : 216}
                            zIndex='9999'
                        />
                    </Text>
                </div>
            ))}
        </Fieldset>
    );
};

AccumulatorsInfoDisplay.propTypes = {
    currency: PropTypes.string,
    maximum_payout: PropTypes.number,
    maximum_ticks: PropTypes.number,
};

export default connect(({ modules }) => ({
    currency: modules.trade.currency,
    maximum_payout: modules.trade.maximum_payout,
    maximum_ticks: modules.trade.maximum_ticks,
}))(AccumulatorsInfoDisplay);
