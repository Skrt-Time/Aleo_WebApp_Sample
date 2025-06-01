import credits.aleo;
import token_registry.aleo;
program afficher_soldes.aleo;

struct TokenMetadata:
    token_id as field;
    name as u128;
    symbol as u128;
    decimals as u8;
    supply as u128;
    max_supply as u128;
    admin as address;
    external_authorization_required as boolean;
    external_authorization_party as address;

struct TokenOwner:
    account as address;
    token_id as field;

struct Balance:
    token_id as field;
    account as address;
    balance as u128;
    authorized_until as u32;

function read_balance_mapping:
    input r0 as field.private;
    async read_balance_mapping r0 into r1;
    output r1 as afficher_soldes.aleo/read_balance_mapping.future;

finalize read_balance_mapping:
    input r0 as field.public;
    get token_registry.aleo/balances[r0] into r1;
