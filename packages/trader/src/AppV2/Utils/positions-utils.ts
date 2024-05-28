import { getSupportedContracts, getTotalProfit, isHighLow, isMultiplierContract } from '@deriv/shared';
import { TPortfolioPosition } from '@deriv/stores/types';
import { TClosedPosition } from 'AppV2/Containers/Positions/positions-content';

type TFormatDate = ({
    time,
    locale,
    dateFormattingConfig,
}: {
    time: string | number | Date;
    locale?: string;
    dateFormattingConfig?: Record<string, string>;
}) => string;

export const DEFAULT_DATE_FORMATTING_CONFIG = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
} as Record<string, string>;

export const filterPositions = (positions: (TPortfolioPosition | TClosedPosition)[], filter: string[]) => {
    // Split contract type names with '/' (e.g. Rise/Fall)
    const splittedFilter = filter.map(option => (option.includes('/') ? option.split('/') : option)).flat();

    return positions.filter(({ contract_info }) => {
        const config = getSupportedContracts(isHighLow({ shortcode: contract_info.shortcode }))[
            contract_info.contract_type as keyof ReturnType<typeof getSupportedContracts>
        ];

        return splittedFilter.includes('main_title' in config ? config.main_title : config.name);
    });
};

export const formatDate: TFormatDate = ({
    time,
    locale = 'en-GB',
    dateFormattingConfig = DEFAULT_DATE_FORMATTING_CONFIG,
}) => new Date(time).toLocaleDateString(locale, dateFormattingConfig);

export const getProfit = (
    contract_info: TPortfolioPosition['contract_info'] | TClosedPosition['contract_info']
): string | number => {
    return (
        (contract_info as TClosedPosition['contract_info']).profit_loss ??
        (isMultiplierContract(contract_info.contract_type)
            ? getTotalProfit(contract_info as TPortfolioPosition['contract_info'])
            : (contract_info as TPortfolioPosition['contract_info']).profit)
    );
};

export const getTotalPositionsProfit = (positions: (TPortfolioPosition | TClosedPosition)[]) => {
    return positions.reduce((sum, { contract_info }) => sum + Number(getProfit(contract_info)), 0);
};
