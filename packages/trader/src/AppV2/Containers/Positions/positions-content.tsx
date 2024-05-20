import React from 'react';
import { TPortfolioPosition } from '@deriv/stores/types';
import EmptyMessage from 'AppV2/Components/EmptyMessage';
import { TEmptyMessageProps } from 'AppV2/Components/EmptyMessage/empty-message';
import Filter from 'AppV2/Components/Filter';

type TPositionsContentProps = Omit<TEmptyMessageProps, 'noMatchesFound'> & {
    positions?: TPortfolioPosition[];
};

const PositionsContent = ({
    isClosedTab,
    onRedirectToTrade,
    positions = ['1' as unknown as TPortfolioPosition],
}: TPositionsContentProps) => {
    const noMatchesFound = false; // TODO: Implement noMatchesFound state change based on filter results

    return (
        <div className={`positions-page__${isClosedTab ? 'closed' : 'open'}`}>
            {positions.length ? (
                <div className='positions-page__container'>
                    <div className='positions-page__filter__wrapper'>
                        <Filter />
                    </div>
                </div>
            ) : (
                <EmptyMessage
                    isClosedTab={isClosedTab}
                    onRedirectToTrade={onRedirectToTrade}
                    noMatchesFound={noMatchesFound}
                />
            )}
        </div>
    );
};

export default PositionsContent;
