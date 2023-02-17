# 05_multisig

```
npm run start:createmultisig

> 05_multisig@1.0.0 start:createmultisig
> node scripts/createMultiSig.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
Multisig account ID: 0.0.3506916
```

```
 npm run start:transferhbarnosuccess

> 05_multisig@1.0.0 start:transferhbarnosuccess
> node scripts/transferHbarNoSuccess.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The multisig ID is 0.0.3506916
Doing transfer from 0.0.3506916 to 0.0.3503429
/Users/myronrotter/Code/github.com/hedera-certification-20230217/05_multisig/node_modules/@hashgraph/sdk/lib/ReceiptStatusError.cjs:43
    super(props, `receipt for transaction ${props.transactionId.toString()} contained error status ${props.status.toString()}`);
    ^

ReceiptStatusError: receipt for transaction 0.0.14493@1676647056.566841247 contained error status INVALID_SIGNATURE
    at new ReceiptStatusError (/Users/myronrotter/Code/github.com/hedera-certification-20230217/05_multisig/node_modules/@hashgraph/sdk/lib/ReceiptStatusError.cjs:43:5)
    at TransactionReceiptQuery._mapStatusError (/Users/myronrotter/Code/github.com/hedera-certification-20230217/05_multisig/node_modules/@hashgraph/sdk/lib/transaction/TransactionReceiptQuery.cjs:273:12)
    at TransactionReceiptQuery.execute (/Users/myronrotter/Code/github.com/hedera-certification-20230217/05_multisig/node_modules/@hashgraph/sdk/lib/Executable.cjs:644:22)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async TransactionResponse.getReceipt (/Users/myronrotter/Code/github.com/hedera-certification-20230217/05_multisig/node_modules/@hashgraph/sdk/lib/transaction/TransactionResponse.cjs:88:21)
    at async main (/Users/myronrotter/Code/github.com/hedera-certification-20230217/05_multisig/scripts/transferHbarNoSuccess.js:63:21) {
  status: Status { _code: 7 },
  transactionId: TransactionId {
    accountId: AccountId {
      shard: Long { low: 0, high: 0, unsigned: false },
      realm: Long { low: 0, high: 0, unsigned: false },
      num: Long { low: 14493, high: 0, unsigned: false },
      aliasKey: null,
      aliasEvmAddress: null,
      _checksum: null
    },
    validStart: Timestamp {
      seconds: Long { low: 1676647056, high: 0, unsigned: false },
      nanos: Long { low: 566841247, high: 0, unsigned: false }
    },
    scheduled: false,
    nonce: null
  },
  transactionReceipt: TransactionReceipt {
    status: Status { _code: 7 },
    accountId: null,
    fileId: null,
    contractId: null,
    topicId: null,
    tokenId: null,
    scheduleId: null,
    exchangeRate: ExchangeRate {
      hbars: 30000,
      cents: 255403,
      expirationTime: 2023-02-17T16:00:00.000Z,
      exchangeRateInCents: 8.513433333333333
    },
    topicSequenceNumber: Long { low: 0, high: 0, unsigned: false },
    topicRunningHash: Uint8Array(0) [],
    totalSupply: Long { low: 0, high: 0, unsigned: false },
    scheduledTransactionId: null,
    serials: [],
    duplicates: [],
    children: []
  }
}
```

Note **Multisig** had 20hbar, 10hbar now. **Account4** had 100hbar initially, 110hbar now.

```
npm run start:transferhbarsuccess

> 05_multisig@1.0.0 start:transferhbarsuccess
> node scripts/transferHbarSuccess.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The multisig ID is 0.0.3506916
Doing transfer from 0.0.3506916 to 0.0.3503429
The transaction consensus status is 22
Multisig account balance 10 ℏ HBar, account 4 balance 110 ℏ
```
