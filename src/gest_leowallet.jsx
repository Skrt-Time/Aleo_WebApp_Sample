import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, use, useCallback } from "react";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import "@demox-labs/aleo-wallet-adapter-reactui/dist/styles.css";
import { useEffect } from "react";


const LeowalletGestion = () => {
  const { publicKey,requestRecords, requestTransaction } = useWallet();
  console.log({ publicKey,requestRecords, requestTransaction });
 
const inputs = ["aleo1c4vut0n0q0cwu3l94lu9g737rqs9cpva2xae0u86e7vmhs9jzcxszyxck6","10u128"];
//const fee = 3_500; // This will fail if fee is not set high enough
 /*const RequestTransaction = () => {
  const { publicKey, requestTransaction } = useWallet();
  console.log({  publicKey });

  const makeMint = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    // The record here is an output from the Requesting Records above
    const record = `'{"id":"0f27d86a-1026-4980-9816-bcdce7569aa4","program_id":"credits.aleo","microcredits":"200000","spent":false,"data":{}}'`
    // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
    //const inputs = [JSON.parse(record), "aleo1kf3dgrz9...", `${amount}u64`];*/
    const makeMint = async () => {
      if (requestTransaction   == null) {
        return;}
      console.log( { requestTransaction });
      const fee =10000;

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.TestnetBeta,
      'real_token_skrt.aleo',
      'mint',
      inputs,
      fee,
      false
    );
    const uuid= await requestTransaction(aleoTransaction);
    console.log("UUID", uuid);
    }

   /* if (requestTransaction) {
      console.log("A");
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      await requestTransaction(aleoTransaction);
      console.log("B");

    }
  };*/

  return (
    <>
    <WalletMultiButton/>
    <br /><br />
    <button onClick={makeMint} disabled={!publicKey}>
      MINT 10
    </button>
    </>
  );
}
export default LeowalletGestion;
