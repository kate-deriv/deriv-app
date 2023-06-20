import { ContractType } from 'Stores/Modules/Trading/Helpers/contract-type';
import { TContractTypesList, TContractValues, TTradeStore } from 'Types';

type TOnChangeContractTypeListParams = {
    contract_types_list: TContractTypesList;
    contract_type: string;
};

export const onChangeContractTypeList = ({
    contract_types_list,
    contract_type,
}: TOnChangeContractTypeListParams): { contract_type: string } => {
    return ContractType.getContractType(contract_types_list, contract_type);
};
export const onChangeContractType = (store: TTradeStore): TContractValues => {
    return ContractType.getContractValues(store);
};
