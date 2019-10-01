import { action, observable } from 'mobx';
import { isEnded }            from '../utils/contract';
import { observer }           from '../utils/observer';

export default class TransactionsStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        observer.register('bot.contract', this.onBotContractEvent);
    }

    @observable contracts = [];

    @action.bound
    onBotContractEvent(data) {
        this.pushTransaction(data);
    }

    @action.bound
    pushTransaction(data) {
        const is_settled  = isEnded(data);
        const contract = {
            buy_price    : data.buy_price,
            contract_type: data.contract_type,
            currency     : data.currency,
            refrence_id  : data.transaction_ids.buy,
            entry_spot   : data.entry_spot,
            exit_spot    : data.entry_tick_display_value,
            profit       : data.profit,
            is_settled,
        };
        if (this.contracts.some(e => e.refrence_id === data.transaction_ids.buy)) {
            this.contracts.shift();
        }
        this.contracts.unshift(contract);
        this.contracts = this.contracts.slice(0);  // force array update
    }

    onUnmount() {
        observer.unregister('contract.status', this.onBotContractEvent);
    }
}
