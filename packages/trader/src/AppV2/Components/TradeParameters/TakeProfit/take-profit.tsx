import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { ActionSheet, TextField } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';
import { useTraderStore } from 'Stores/useTraderStores';
import { getCurrencyDisplayCode, getDecimalPlaces } from '@deriv/shared';
import { focusAndOpenKeyboard } from 'AppV2/Utils/trade-params-utils';
import Carousel from 'AppV2/Components/Carousel';
import CarouselHeader from 'AppV2/Components/Carousel/carousel-header';
import TakeProfitDescription from './take-profit-description';
import TakeProfitInput from './take-profit-input';

type TTakeProfitProps = {
    is_minimized?: boolean;
};

const TakeProfit = observer(({ is_minimized }: TTakeProfitProps) => {
    const {
        currency,
        has_open_accu_contract,
        has_take_profit,
        is_accumulator,
        take_profit,
        onChangeMultiple,
        onChange,
        validation_params,
        validation_errors,
    } = useTraderStore();
    const [is_open, setIsOpen] = React.useState(false);
    const [is_enabled, setIsEnabled] = React.useState(has_take_profit);

    const input_ref = React.useRef<HTMLInputElement>(null);
    const focused_input_ref = React.useRef<HTMLInputElement>(null);
    const focus_timeout = React.useRef<ReturnType<typeof setTimeout>>();

    const min_take_profit = validation_params?.take_profit?.min;
    const max_take_profit = validation_params?.take_profit?.max;
    const decimals = getDecimalPlaces(currency);
    const validation_error = validation_errors.take_profit[0];

    const getInputMessage = () =>
        is_enabled && min_take_profit && max_take_profit && !validation_error ? (
            <Localize
                i18n_default_text='Acceptable range: {{min_take_profit}} to {{max_take_profit}} {{currency}}'
                values={{ currency, min_take_profit, max_take_profit }}
            />
        ) : (
            ''
        );

    const onToggleSwitch = (new_value: boolean) => {
        setIsEnabled(new_value);

        if (new_value) {
            clearTimeout(focus_timeout.current);
            focus_timeout.current = focusAndOpenKeyboard(focused_input_ref.current, input_ref.current);
        } else {
            input_ref.current?.blur();
        }
    };

    const onActionSheetClose = () => {
        setIsOpen(false);
        setIsEnabled(has_take_profit);
    };

    const action_sheet_content = [
        {
            id: 1,
            component: (
                <TakeProfitInput
                    currency={currency}
                    decimals={decimals}
                    is_enabled={is_enabled}
                    is_accumulator={is_accumulator}
                    message={getInputMessage()}
                    onToggleSwitch={onToggleSwitch}
                    onChangeMultiple={onChangeMultiple}
                    onChange={onChange}
                    onActionSheetClose={onActionSheetClose}
                    ref={input_ref}
                    take_profit_value={take_profit}
                    validation_error={validation_error}
                />
            ),
        },
        {
            id: 2,
            component: <TakeProfitDescription />,
        },
    ];

    React.useEffect(() => {
        return () => clearTimeout(focus_timeout.current);
    }, []);

    return (
        <React.Fragment>
            <TextField
                variant='fill'
                readOnly
                label={
                    <Localize i18n_default_text='Take profit' key={`take-profit${is_minimized ? '-minimized' : ''}`} />
                }
                value={has_take_profit && take_profit ? `${take_profit} ${getCurrencyDisplayCode(currency)}` : '-'}
                className={clsx('trade-params__option', is_minimized && 'trade-params__option--minimized')}
                disabled={has_open_accu_contract}
                onClick={() => setIsOpen(true)}
            />
            <ActionSheet.Root isOpen={is_open} onClose={onActionSheetClose} position='left' expandable={false}>
                <ActionSheet.Portal shouldCloseOnDrag>
                    <Carousel
                        header={CarouselHeader}
                        pages={action_sheet_content}
                        title={<Localize i18n_default_text='Take profit' />}
                    />
                    {/* this input with inline styles is needed to fix a focus issue in Safari */}
                    <input
                        ref={focused_input_ref}
                        style={{ height: 0, opacity: 0, display: 'none' }}
                        pattern='[^0-9.,]/g'
                        inputMode='decimal'
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </React.Fragment>
    );
});

export default TakeProfit;
