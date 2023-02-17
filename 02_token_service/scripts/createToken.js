const {
    Client,
    AccountBalanceQuery,
    PrivateKey,
    Wallet,
    TokenType,
    TokenCreateTransaction,
    AccountId,
    TokenSupplyType
} = require("@hashgraph/sdk");
require("dotenv").config({ path: ".env" });

console.log(process.env.MY_ACCOUNT_ID);
console.log(process.env.MY_PRIVATE_KEY);

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

// Throw error if not set
if (myAccountId == null || myPrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Connection to Hedera network
const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

// Account1
console.log(process.env.ACCOUNT_1_ID);
console.log(process.env.ACCOUNT_1_PRIVATE_KEY);

const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PRIVATE_KEY);

// Throw error if not set
if (account1Id == null || account1PrivateKey == null ) {
    throw new Error("Environment variables account1Id and account1PrivateKey must be present");
}

const account1 = new Wallet(
    account1Id,
    account1PrivateKey
)

async function main() {
    //Create the transaction and freeze for manual signing
    const transaction = await new TokenCreateTransaction()
        .setTokenName("Token Name")
        .setTokenSymbol("TN")
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(account1.accountId)
        .setAdminKey(account1.publicKey)
        .setSupplyKey(account1.publicKey)
        .setSupplyType(TokenSupplyType.Finite)
        .setInitialSupply(1000)
        .setMaxSupply(1000)
        .freezeWith(client);

    //Sign the transaction with the client, who is set as admin and treasury account
    const signTx = await transaction.sign(account1PrivateKey);

    //Submit to a Hedera network
    const txResponse = await signTx.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the token ID from the receipt
    const tokenId = receipt.tokenId;

    console.log("The new token ID is " + tokenId);

    process.exit();
}

main();
