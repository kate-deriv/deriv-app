import classNames from 'classnames';
import React from 'react';
import { Money } from '@deriv/components';
import { isDesktop, isMobile, getDecimalPlaces } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { observer } from '@deriv/stores';
import { useTraderStore } from 'Stores/useTraderStores';

type TProposalInfo = {
    has_error?: boolean;
    id: string;
    has_increased?: boolean;
    message?: string;
    cancellation?: {
        ask_price: number;
        date_expiry: number;
    };
    growth_rate?: number;
    obj_contract_basis?: Record<'text' | 'value', string>;
    returns?: string;
    stake: string;
};

const CancelDealInfo = observer(({ proposal_info }: { proposal_info: TProposalInfo }) => {
    const { currency, has_cancellation } = useTraderStore();
    const { id, cancellation, has_error } = proposal_info;
    const error = has_error || !id;
    const [is_row_layout, setIsRowLayout] = React.useState(false);

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            const el_height = ref.current.parentElement?.clientHeight;
            if (
                el_height &&
                ((el_height > 21 && isDesktop()) || ((el_height > 21 || getDecimalPlaces(currency) > 2) && isMobile()))
            ) {
                setIsRowLayout(true);
            } else {
                setIsRowLayout(false);
            }
        }
    }, [cancellation, currency, is_row_layout, setIsRowLayout]);

    if (!has_cancellation) return null;

    return (
        <div
            className={classNames('trade-container__cancel-deal-info', {
                'trade-container__cancel-deal-info--row-layout': is_row_layout,
            })}
        >
            {cancellation && (
                <React.Fragment>
                    <div className='trade-container__price-info-basis' ref={ref}>
                        {localize('Deal cancel. fee')}
                    </div>
                    <div className='trade-container__price-info-value'>
                        {!error && (
                            <Money
                                amount={cancellation.ask_price}
                                className='trade-container__price-info-currency'
                                currency={currency}
                                show_currency
                            />
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
});

export default CancelDealInfo;
