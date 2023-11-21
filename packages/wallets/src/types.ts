import type {
    useAccountsList,
    useActiveAccount,
    useActiveTradingAccount,
    useActiveWalletAccount,
    useAllWalletAccounts,
    useAvailableMT5Accounts,
    useCreateOtherCFDAccount,
    useCreateWallet,
    useCryptoTransactions,
    useCtraderAccountsList,
    useCurrencyConfig,
    useDxtradeAccountsList,
    useDynamicLeverage,
    useMT5AccountsList,
    usePOA,
    usePOI,
    useSortedMT5Accounts,
    useTransactions,
    useTransferBetweenAccounts,
    useWalletAccountsList,
} from '@deriv/api';

// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace THooks {
    export type AvailableMT5Accounts = NonNullable<ReturnType<typeof useAvailableMT5Accounts>['data']>[number];
    export type CreateWallet = NonNullable<ReturnType<typeof useCreateWallet>['data']>;
    export type CtraderAccountsList = NonNullable<ReturnType<typeof useCtraderAccountsList>['data']>[number];
    export type DxtradeAccountsList = NonNullable<ReturnType<typeof useDxtradeAccountsList>['data']>[number];
    export type MT5AccountsList = NonNullable<ReturnType<typeof useMT5AccountsList>['data']>[number];
    export type SortedMT5Accounts = NonNullable<ReturnType<typeof useSortedMT5Accounts>['data']>[number];
    export type WalletAccountsList = NonNullable<ReturnType<typeof useWalletAccountsList>['data']>[number];
    export type ActiveWalletAccount = NonNullable<ReturnType<typeof useActiveWalletAccount>['data']>;
    export type AccountsList = NonNullable<ReturnType<typeof useAccountsList>['data']>[number];
    export type ActiveTradingAccount = NonNullable<ReturnType<typeof useActiveTradingAccount>['data']>;
    export type ActiveAccount = NonNullable<ReturnType<typeof useActiveAccount>['data']>;
    export type AllWalletAccounts = NonNullable<ReturnType<typeof useAllWalletAccounts>['data']>[number];
    export type DynamicLeverage = NonNullable<ReturnType<typeof useDynamicLeverage>['data']>;
    export type CryptoTransactions = NonNullable<ReturnType<typeof useCryptoTransactions>['data']>[number];
    export type POA = NonNullable<ReturnType<typeof usePOA>['data']>;
    export type POI = NonNullable<ReturnType<typeof usePOI>['data']>;
    export type CurrencyConfig = NonNullable<ReturnType<typeof useCurrencyConfig>['data']>[string];
    export type Transactions = NonNullable<ReturnType<typeof useTransactions>['data']>[number];
    export type TransferAccount = NonNullable<
        NonNullable<ReturnType<typeof useTransferBetweenAccounts>['data']>['accounts']
    >[number];
}
// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace TPlatforms {
    export type All = MT5 | OtherAccounts | SortedMT5Accounts;
    export type MT5 = THooks.AvailableMT5Accounts['platform'];
    export type OtherAccounts = Exclude<
        Parameters<NonNullable<ReturnType<typeof useCreateOtherCFDAccount>['mutate']>>[0]['payload']['platform'],
        'derivez'
    >;
    export type SortedMT5Accounts = THooks.SortedMT5Accounts['platform'];
}
// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace TMarketTypes {
    export type All = CreateOtherCFDAccount | SortedMT5Accounts;
    export type CreateOtherCFDAccount = Parameters<
        NonNullable<ReturnType<typeof useCreateOtherCFDAccount>['mutate']>
    >[0]['payload']['market_type'];
    export type SortedMT5Accounts = Exclude<THooks.SortedMT5Accounts['market_type'], undefined>;
}

// eslint-disable-next-line  @typescript-eslint/no-namespace
export namespace TDisplayBalance {
    export type CtraderAccountsList = THooks.CtraderAccountsList['display_balance'];
    export type DxtradeAccountsList = THooks.DxtradeAccountsList['display_balance'];
    export type MT5AccountsList = THooks.MT5AccountsList['display_balance'];
    export type WalletAccountsList = THooks.WalletAccountsList['display_balance'];
    export type ActiveWalletAccount = THooks.ActiveWalletAccount['display_balance'];
    export type AccountsList = THooks.AccountsList['display_balance'];
    export type ActiveTradingAccount = THooks.ActiveTradingAccount['display_balance'];
}

export type TGenericSizes = '2xl' | '2xs' | '3xl' | '3xs' | '4xl' | '5xl' | '6xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';

export type TWalletLandingCompanyName = Extract<THooks.MT5AccountsList['landing_company_short'], 'malta' | 'svg'>;
export type TMT5LandingCompanyName = THooks.MT5AccountsList['landing_company_short'];
