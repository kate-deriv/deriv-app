import React from 'react';
import { TContractInfo } from '@deriv/shared';
import { Loading } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { EmptyPositions, TEmptyPositionsProps } from 'AppV2/Components/EmptyPositions';
import { TPortfolioPosition } from '@deriv/stores/types';
import { ContractCardList, ContractCardsSections } from 'AppV2/Components/ContractCard';
import { ContractTypeFilter, TimeFilter } from 'AppV2/Components/Filter';
import TotalProfitLoss from 'AppV2/Components/TotalProfitLoss';
import { filterPositions, getTotalPositionsProfit } from '../../Utils/positions-utils';
import { TReportsStore, useReportsStore } from '../../../../../reports/src/Stores/useReportsStores';
import useTradeTypeFilter from 'AppV2/Hooks/useTradeTypeFilter';
import useTimeFilter from 'AppV2/Hooks/useTimeFilter';

type TPositionsContentProps = Omit<TEmptyPositionsProps, 'noMatchesFound'> & {
    hasButtonsDemo?: boolean;
    setHasButtonsDemo?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TClosedPosition = {
    contract_info: TReportsStore['profit_table']['data'][number];
};

const PositionsContent = observer(({ hasButtonsDemo, isClosedTab, setHasButtonsDemo }: TPositionsContentProps) => {
    const { contractTypeFilter, setContractTypeFilter } = useTradeTypeFilter({ isClosedTab });
    const { timeFilter, setTimeFilter, customTimeRangeFilter, setCustomTimeRangeFilter } = useTimeFilter();
    const [filteredPositions, setFilteredPositions] = React.useState<(TPortfolioPosition | TClosedPosition)[]>([]);
    const [noMatchesFound, setNoMatchesFound] = React.useState(false);

    const { common, client, portfolio } = useStore();
    const { server_time = undefined } = isClosedTab ? {} : common; // Server time is required only to update cards timers in Open positions
    const { currency } = client;
    const { active_positions, is_active_empty, onClickCancel, onClickSell, onMount: onOpenTabMount } = portfolio;
    const {
        data,
        handleScroll,
        is_empty,
        is_loading: isFetchingClosedPositions,
        onMount: onClosedTabMount,
        onUnmount: onClosedTabUnmount,
        handleDateChange,
    } = useReportsStore().profit_table;
    const closedPositions = React.useMemo(() => data.map(d => ({ contract_info: d })), [data]);
    const positions = React.useMemo(
        () => (isClosedTab ? closedPositions : active_positions),
        [active_positions, isClosedTab, closedPositions]
    );
    const hasNoPositions = isClosedTab ? is_empty && !timeFilter && !customTimeRangeFilter : is_active_empty;
    const shouldShowEmptyMessage = hasNoPositions || noMatchesFound;
    const shouldShowContractCards =
        filteredPositions.length && (isClosedTab || (filteredPositions[0]?.contract_info as TContractInfo)?.status);

    const handleTradeTypeFilterChange = (filterValues: string[]) => {
        setContractTypeFilter(filterValues);
        if (filterValues.length) {
            const result = filterPositions(positions, filterValues);
            setNoMatchesFound(!result.length);
            setFilteredPositions(result);
        } else {
            setNoMatchesFound(false);
            setFilteredPositions(positions);
        }
    };

    const onScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            if (isClosedTab) {
                handleScroll(e);
            }
        },
        [handleScroll, isClosedTab]
    );

    const contractCards = isClosedTab ? (
        <ContractCardsSections
            positions={filteredPositions}
            onScroll={onScroll}
            isLoadingMore={isFetchingClosedPositions}
        />
    ) : (
        <ContractCardList
            currency={currency}
            hasButtonsDemo={hasButtonsDemo}
            onClickCancel={isClosedTab ? undefined : onClickCancel}
            onClickSell={isClosedTab ? undefined : onClickSell}
            positions={filteredPositions}
            setHasButtonsDemo={setHasButtonsDemo}
            serverTime={server_time}
        />
    );

    React.useEffect(() => {
        if (isClosedTab) {
            setNoMatchesFound(!positions.length && !!(timeFilter || customTimeRangeFilter));

            // For cases with 2 filters: when time filter was reset and we received new positions, we need to filter them by contract type
            if (contractTypeFilter.length && positions.length && !timeFilter && !customTimeRangeFilter) {
                const result = filterPositions(positions, contractTypeFilter);
                setNoMatchesFound(!result.length);
                setFilteredPositions(result);
            }
        }
    }, [customTimeRangeFilter, timeFilter, isClosedTab, positions, contractTypeFilter]);

    React.useEffect(() => {
        isClosedTab ? onClosedTabMount() : onOpenTabMount();

        return () => {
            isClosedTab && onClosedTabUnmount();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => setFilteredPositions(positions), [positions]);

    if (!shouldShowContractCards && !shouldShowEmptyMessage) return <Loading />;
    return (
        <div className={`positions-page__${isClosedTab ? 'closed' : 'open'}`}>
            {!hasNoPositions && (
                <div className='positions-page__filter__wrapper'>
                    {isClosedTab && (
                        <TimeFilter
                            timeFilter={timeFilter}
                            setTimeFilter={setTimeFilter}
                            handleDateChange={handleDateChange}
                            customTimeRangeFilter={customTimeRangeFilter}
                            setCustomTimeRangeFilter={setCustomTimeRangeFilter}
                            setNoMatchesFound={setNoMatchesFound}
                        />
                    )}
                    <ContractTypeFilter
                        setContractTypeFilter={filterValues => handleTradeTypeFilterChange(filterValues)}
                        contractTypeFilter={contractTypeFilter}
                    />
                    {shouldShowContractCards && (
                        <TotalProfitLoss
                            currency={currency}
                            hasBottomAlignment={isClosedTab}
                            totalProfitLoss={getTotalPositionsProfit(filteredPositions)}
                        />
                    )}
                </div>
            )}
            {shouldShowEmptyMessage ? (
                <EmptyPositions isClosedTab={isClosedTab} noMatchesFound={noMatchesFound} />
            ) : (
                shouldShowContractCards && contractCards
            )}
        </div>
    );
});

export default PositionsContent;
