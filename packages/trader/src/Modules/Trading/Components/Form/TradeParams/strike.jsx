import React from 'react';
import classNames from 'classnames';
import BarriersList from './barriers-list';
import { DesktopWrapper, InputField, MobileWrapper, Dropdown, Text } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { toMoment } from '@deriv/shared';
import Fieldset from 'App/Components/Form/fieldset.jsx';
import { connect } from 'Stores/connect';
import StrikeParamModal from 'Modules/Trading/Containers/strike-param-modal';
import './strike-field.scss';

const Strike = ({
    barrier_1,
    current_focus,
    onChange,
    validation_errors,
    setCurrentFocus,
    advanced_duration_unit,
    strike_price_choices,
    expiry_type,
    expiry_date,
    server_time,
    vanilla_trade_type,
}) => {
    const [is_open, setIsOpen] = React.useState(false);
    const [should_open_dropdown, setShouldOpenDropdown] = React.useState(false);
    const [selected_value, setSelectedValue] = React.useState(barrier_1);

    React.useEffect(() => {
        setSelectedValue(barrier_1);
    }, [barrier_1]);

    const toggleWidget = () => setIsOpen(!is_open);

    const is_24_hours_contract = expiry_date ? toMoment(expiry_date).isSame(toMoment(server_time), 'day') : false;

    const is_relative_strike_applicable =
        expiry_type === 'endtime' ? is_24_hours_contract : advanced_duration_unit !== 'd';

    const strike_price_list = strike_price_choices.map(strike_price => ({ text: strike_price, value: strike_price }));

    return (
        <React.Fragment>
            <DesktopWrapper>
                <Fieldset
                    className='trade-container__fieldset trade-container__barriers'
                    header={localize('Strike price')}
                    header_tooltip={
                        <Localize
                            i18n_default_text='<0>{{trade_type}}:</0> You will get a payout if the market price is {{payout_status}} this price <0>at the expiry time.</0> Otherwise, your payout will be zero.'
                            components={[<strong key={0} />]}
                            values={{
                                trade_type: vanilla_trade_type === 'VANILLALONGCALL' ? 'For Call' : 'For Put',
                                payout_status: vanilla_trade_type === 'VANILLALONGCALL' ? 'above' : 'below',
                            }}
                        />
                    }
                >
                    {!is_relative_strike_applicable ? (
                        <InputField
                            type='number'
                            name='barrier_1'
                            value={selected_value}
                            className='trade-container__barriers-single'
                            classNameInput={classNames(
                                'trade-container__input',
                                'trade-container__barriers-input',
                                'trade-container__barriers-single-input'
                            )}
                            current_focus={current_focus}
                            error_messages={validation_errors?.barrier_1 || []}
                            is_float
                            is_signed
                            is_read_only
                            setCurrentFocus={setCurrentFocus}
                            onClick={() => setShouldOpenDropdown(true)}
                        />
                    ) : (
                        <div className='trade-container__strike-field'>
                            <Text size='s' className='strike-field--text'>
                                {localize('Spot')}
                            </Text>
                            <Dropdown
                                classNameDisplay='dc-dropdown__display--duration'
                                disabled={false}
                                id='strike'
                                is_alignment_left
                                is_nativepicker={false}
                                list={strike_price_list}
                                name='barrier_1'
                                no_border={true}
                                onChange={onChange}
                                value={barrier_1}
                            />
                        </div>
                    )}
                </Fieldset>
                {should_open_dropdown && (
                    <BarriersList
                        active_item_classname='trade-container__barriers-table__item--selected'
                        base_classname='trade-container__barriers-table__item'
                        className='trade-container__barriers-table__list'
                        header='Strike Prices'
                        list={strike_price_choices}
                        selected_item={selected_value}
                        show_table={should_open_dropdown}
                        onClick={strike => {
                            setSelectedValue(strike);
                            setShouldOpenDropdown(false);
                            onChange({ target: { name: 'barrier_1', value: strike } });
                        }}
                        onClickCross={() => setShouldOpenDropdown(false)}
                    />
                )}
            </DesktopWrapper>
            <MobileWrapper>
                <div className='mobile-widget__wrapper'>
                    <div className='strike-widget' onClick={toggleWidget}>
                        <div className='mobile-widget__spot'>{<Text size='xs'>{localize('Spot')}</Text>}</div>
                        <div className='mobile-widget__amount'>{barrier_1}</div>
                        <div className='mobile-widget__type'>{localize('Strike price')}</div>
                    </div>
                    <StrikeParamModal
                        is_open={is_open}
                        toggleModal={toggleWidget}
                        strike={barrier_1}
                        onChange={onChange}
                        name='barrier_1'
                        strike_price_list={strike_price_list}
                        vanilla_trade_type={vanilla_trade_type}
                    />
                </div>
            </MobileWrapper>
        </React.Fragment>
    );
};

export default connect(({ modules, ui, common }) => ({
    barrier_1: modules.trade.barrier_1,
    current_focus: ui.current_focus,
    setCurrentFocus: ui.setCurrentFocus,
    onChange: modules.trade.onChange,
    validation_errors: modules.trade.validation_errors,
    advanced_duration_unit: ui.advanced_duration_unit,
    strike_price_choices: modules.trade.barrier_choices,
    expiry_type: modules.trade.expiry_type,
    start_date: modules.trade.start_date,
    expiry_date: modules.trade.expiry_date,
    server_time: common.server_time,
    vanilla_trade_type: modules.trade.vanilla_trade_type,
}))(Strike);
