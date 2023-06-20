import { useTraderStore } from 'Stores/useTraderStores';

export type TProposalTypeInfo = {
    has_error?: boolean;
    id: string;
    has_increased?: boolean;
    message?: string;
    cancellation?: {
        ask_price: number;
        date_expiry: number;
    };
    growth_rate?: number;
    returns?: string;
    stake: string;
};

export type TContractTypesList = {
    [key: string]: { name: string; categories: Array<TTextValueStrings> };
};

export type TContractValues = {
    form_components: string[];
    basis_list: Array<TTextValueStrings>;
    basis: string;
    trade_types: { [key: string]: string };
    start_date: number;
    start_dates_list: Array<{ text: string; value: number }>;
    contract_start_type: string;
    barrier_count?: number;
    barrier_1: string;
    barrier_2: string;
    duration_unit: string;
    duration_units_list: Array<TTextValueStrings>;
    duration_min_max: {
        [key: string]: { min: number; max: number };
    };
    expiry_type: string;
    accumulator_range_list: number[];
    multiplier_range_list: number[];
    cancellation_range_list: Array<TTextValueStrings>;
};

type TTextValueStrings = {
    text: string;
    value: string;
};

export type TTradeStore = ReturnType<typeof useTraderStore>;
