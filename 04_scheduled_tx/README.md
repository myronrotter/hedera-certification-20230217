# 04_scheduled_tx

```
npm run start:createscheduledtx

> 04_scheduled_tx@1.0.0 start:createscheduledtx
> node scripts/createScheduledTx.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The schedule ID is 0.0.3505694
The scheduled transaction ID is 0.0.14493@1676641844.351477159?scheduled
```

```
npm run start:deletescheduledtx

> 04_scheduled_tx@1.0.0 start:deletescheduledtx
> node scripts/deleteScheduledTx.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The schedule ID is 0.0.3505694
The transaction consensus status is 22
```

```
npm run start:getscheduledtxinfo

> 04_scheduled_tx@1.0.0 start:getscheduledtxinfo
> node scripts/getScheduledTxInfo.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The schedule ID is 0.0.3505694
The schedule info: deleted timestamp: 1676642224.360191003
The schedule info: executed timestamp: null
The schedule info: expiration timestamp: 1676643653.0
```

Note that **SCHEDULE_ALREADY_DELETED** when tx deleted beforehand.

```
npm run start:executescheduledtx

> 04_scheduled_tx@1.0.0 start:executescheduledtx
> node scripts/executescheduledtx.js

0.0.14493
b33efaaa07d1b7a533e520eea27d9f1fd05da6c4510c5744f5fab0806175236e
The schedule ID is 0.0.3505694
/Users/myronrotter/Code/github.com/hedera-certification-20230217/04_scheduled_tx/node_modules/@hashgraph/sdk/lib/ReceiptStatusError.cjs:43
    super(props, `receipt for transaction ${props.transactionId.toString()} contained error status ${props.status.toString()}`);
    ^

ReceiptStatusError: receipt for transaction 0.0.14493@1676642926.599831192 contained error status SCHEDULE_ALREADY_DELETED
    at new ReceiptStatusError (/Users/myronrotter/Code/github.com/hedera-certification-20230217/04_scheduled_tx/node_modules/@hashgraph/sdk/lib/ReceiptStatusError.cjs:43:5)
    at TransactionReceiptQuery._mapStatusError (/Users/myronrotter/Code/github.com/hedera-certification-20230217/04_scheduled_tx/node_modules/@hashgraph/sdk/lib/transaction/TransactionReceiptQuery.cjs:273:12)
    at TransactionReceiptQuery.execute (/Users/myronrotter/Code/github.com/hedera-certification-20230217/04_scheduled_tx/node_modules/@hashgraph/sdk/lib/Executable.cjs:644:22)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async TransactionResponse.getReceipt (/Users/myronrotter/Code/github.com/hedera-certification-20230217/04_scheduled_tx/node_modules/@hashgraph/sdk/lib/transaction/TransactionResponse.cjs:88:21)
    at async main (/Users/myronrotter/Code/github.com/hedera-certification-20230217/04_scheduled_tx/scripts/executescheduledtx.js:40:21) {
  status: Status { _code: 212 },
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
      seconds: Long { low: 1676642926, high: 0, unsigned: false },
      nanos: Long { low: 599831192, high: 0, unsigned: false }
    },
    scheduled: false,
    nonce: null
  },
  transactionReceipt: TransactionReceipt {
    status: Status { _code: 212 },
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
