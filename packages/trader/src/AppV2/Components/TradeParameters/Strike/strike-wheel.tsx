import React from 'react';
import clsx from 'clsx';
import { ActionSheet, Text, WheelPicker } from '@deriv-com/quill-ui';
import { Localize } from '@deriv/translations';

type TStrikeWheelProps = {
    current_strike: string;
    currency: string;
    is_small_screen_device?: boolean;
    onStrikePriceSelect: (e: {
        target: {
            name: string;
            value: unknown;
        };
    }) => void;
    payout_per_point?: string | number;
    strike_price_list: {
        value: string;
    }[];
};

const StrikeWheel = ({
    current_strike,
    currency,
    is_small_screen_device,
    onStrikePriceSelect,
    payout_per_point,
    strike_price_list,
}: TStrikeWheelProps) => {
    const [selected_value, setSelectedValue] = React.useState<string | number>(current_strike);

    return (
        <React.Fragment>
            <ActionSheet.Content
                className={clsx('strike__wrapper', is_small_screen_device && 'strike__wrapper--small-screen')}
                data-testid='dt_strike_wrapper'
            >
                <div className='strike__wheel-picker'>
                    <WheelPicker
                        data={strike_price_list}
                        selectedValue={selected_value}
                        setSelectedValue={setSelectedValue}
                    />
                </div>
                <div className='strike__payout'>
                    <Text color='quill-typography__color--subtle' size='sm'>
                        <Localize i18n_default_text='Payout per point:' />
                    </Text>
                    <Text size='sm'>
                        {payout_per_point} {currency}
                    </Text>
                </div>
            </ActionSheet.Content>
            <ActionSheet.Footer
                alignment='vertical'
                primaryAction={{
                    content: <Localize i18n_default_text='Save' />,
                    onAction: () => {
                        if (selected_value !== current_strike)
                            onStrikePriceSelect({ target: { name: 'barrier_1', value: selected_value } });
                    },
                }}
            />
        </React.Fragment>
    );
};

export default StrikeWheel;
