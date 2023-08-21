import React from 'react';
import { Tabs } from '@deriv/components';
import { localize } from '@deriv/translations';
import { WS } from '@deriv/shared';
import { useTraderStore } from 'Stores/useTraderStores';
import ContractDetails from './contract-details';
import ContractHistory from './contract-history';

type TContractUpdateHistory =
    | []
    | { order_date: number; display_name: string; order_amount: number | string; value?: string }[];

type TContractAudit = Pick<ReturnType<typeof useTraderStore>, 'is_accumulator' | 'is_turbos' | 'is_multiplier'> & {
    contract_update_history: TContractUpdateHistory;
    has_result: boolean;
    toggleHistoryTab: (state_change?: boolean) => void;
};

type TResponse = {
    contract_update_history: TContractUpdateHistory;
};

const ContractAudit = ({
    contract_update_history,
    has_result,
    is_accumulator,
    is_multiplier,
    is_turbos,
    toggleHistoryTab,
    ...props
}: TContractAudit) => {
    //@ts-expect-error until parent component will be typescript migrated in order to verify props
    const { contract_id, currency } = props.contract_info;
    const [update_history, setUpdateHistory] = React.useState<TContractUpdateHistory>([]);

    const getSortedUpdateHistory = (history: TContractUpdateHistory) =>
        history.sort((a, b) => b.order_date - a.order_date);

    React.useEffect(() => {
        if (!!contract_update_history.length && contract_update_history.length > update_history.length)
            setUpdateHistory(getSortedUpdateHistory(contract_update_history));
    }, [contract_update_history, update_history]);

    const onTabItemClick = (tab_index: number) => {
        toggleHistoryTab(!!tab_index);
        if (tab_index) {
            WS.contractUpdateHistory(contract_id).then((response: TResponse) => {
                setUpdateHistory(getSortedUpdateHistory(response.contract_update_history));
            });
        }
    };

    if (!has_result) return null;

    if (!is_multiplier && !is_accumulator && !is_turbos) {
        return (
            <div className='contract-audit__wrapper'>
                {/* @ts-expect-error: until parent component will be typescript migrated in order to verify props */}
                <ContractDetails {...props} />
            </div>
        );
    }
    return (
        <div className='contract-audit__wrapper'>
            <Tabs top className='contract-audit__tabs' onTabItemClick={onTabItemClick}>
                <div label={localize('Details')}>
                    {/* @ts-expect-error: until parent component will be typescript migrated in order to verify props */}
                    <ContractDetails {...props} />
                </div>
                <div label={localize('History')}>
                    <ContractHistory currency={currency} history={update_history} />
                </div>
            </Tabs>
        </div>
    );
};

export default ContractAudit;
