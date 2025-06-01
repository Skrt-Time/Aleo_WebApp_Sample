import token_registry.aleo;
program afficher_soldes.aleo {
    struct Balance {
    token_id: field,
    account: address,
    balance: u128,
    authorized_until: u32
  }
    async transition read_balance_mapping(field_hash : field) -> (Future) {
        return finalize_read_balance_mapping(field_hash);
    }
    async function finalize_read_balance_mapping(map_key : field){
        let bal_struct: Balance = token_registry.aleo/balances.get(map_key);
        let bal_value: u128 = bal_struct.balance;
    }
}

