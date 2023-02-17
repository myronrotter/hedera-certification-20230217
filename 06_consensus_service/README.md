# 06_consensus_service

```
npm run start:createtopic

> 06_consensus_service@1.0.0 start:createtopic
> node scripts/createTopic.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
Your topic ID is: 0.0.3506536
```

```
npm run start:submitmessagesuccess

> 06_consensus_service@1.0.0 start:submitmessagesuccess
> node scripts/submitMessageSuccess.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The topic ID is 0.0.3506536
The message transaction status: 22
```

Note **INVALID_SIGNATURE** when signing with account 2.

```
npm run start:submitmessagenosuccess

> 06_consensus_service@1.0.0 start:submitmessagenosuccess
> node scripts/submitMessageNoSuccess.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The topic ID is 0.0.3506536
/Users/myronrotter/Code/github.com/hedera-certification-20230217/06_consensus_service/node_modules/@hashgraph/sdk/lib/ReceiptStatusError.cjs:43
    super(props, `receipt for transaction ${props.transactionId.toString()} contained error status ${props.status.toString()}`);
    ^

ReceiptStatusError: receipt for transaction 0.0.14493@1676644346.987977149 contained error status INVALID_SIGNATURE
    at new ReceiptStatusError (/Users/myronrotter/Code/github.com/hedera-certification-20230217/06_consensus_service/node_modules/@hashgraph/sdk/lib/ReceiptStatusError.cjs:43:5)
    at TransactionReceiptQuery._mapStatusError (/Users/myronrotter/Code/github.com/hedera-certification-20230217/06_consensus_service/node_modules/@hashgraph/sdk/lib/transaction/TransactionReceiptQuery.cjs:273:12)
    at TransactionReceiptQuery.execute (/Users/myronrotter/Code/github.com/hedera-certification-20230217/06_consensus_service/node_modules/@hashgraph/sdk/lib/Executable.cjs:644:22)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async TransactionResponse.getReceipt (/Users/myronrotter/Code/github.com/hedera-certification-20230217/06_consensus_service/node_modules/@hashgraph/sdk/lib/transaction/TransactionResponse.cjs:88:21)
    at async main (/Users/myronrotter/Code/github.com/hedera-certification-20230217/06_consensus_service/scripts/submitMessageNoSuccess.js:43:24) {
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
      seconds: Long { low: 1676644346, high: 0, unsigned: false },
      nanos: Long { low: 987977149, high: 0, unsigned: false }
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
      cents: 255989,
      expirationTime: 2023-02-17T15:00:00.000Z,
      exchangeRateInCents: 8.532966666666667
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
