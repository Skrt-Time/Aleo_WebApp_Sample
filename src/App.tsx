import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
import afficher_soldes from "../helloworld_skrt/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker";
import LeowalletGestion from "./gest_leowallet.jsx";


import React, { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { AleoNetworkClient } from '@aleohq/sdk';

import type { NextApiRequest, NextApiResponse } from 'next';
//import '@/lib/fetch';
import { Plaintext } from "@demox-labs/aleo-sdk";

type ErrorData = {
  error: string;
};


const aleoWorker = AleoWorker();
function App() {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function execute() {
    setExecuting(true);
    const result = await aleoWorker.localProgramExecution(
      afficher_soldes,
      "main",
      ["5u32", "5u32"],
    );
    setExecuting(false);

    alert(JSON.stringify(result));
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(afficher_soldes);
      console.log("Transaction:")
      console.log("https://explorer.provable.com/transaction/" + result)
      alert("Transaction ID: " + result);
    } catch (e) {
      console.log(e)
      alert("Error with deployment, please check console for details");
    }
    setDeploying(false);
  }
  
  //Pour le balance
  async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
  ) {
    if (req.method !== 'GET') {
      return res.status(400).json({ error: 'Invalid method.' });
    }
    if (req.query.aleoAddress == null) {
      return res.status(400).json({ error: "'aleoAddress' argument required." });
    }
    const { aleoAddress } = req.query;
  
    const pAleoTokenOwnerString = `{ account: ${aleoAddress}, token_id: ${process.env.PALEO_TOKEN_ID} }`;
    /*const pAleoTokenOwnerHash = Plaintext.fromString(
      process.env.NEXT_PUBLIC_NETWORK,
      pAleoTokenOwnerString,
    ).hashBhp256();
  
    const pondoTokenOwnerString = `{ account: ${aleoAddress}, token_id: ${process.env.PONDO_TOKEN_ID} }`;
    const pondoTokenOwnerHash = Plaintext.fromString(
      process.env.NEXT_PUBLIC_NETWORK,
      pondoTokenOwnerString,
    ).hashBhp256();
    const balance_pub = await aleoWorker.localProgramExecution(
      afficher_soldes,
      "read_balance_mapping",
      [pondoTokenOwnerHash],
    );
    const balance_prv = await aleoWorker.localProgramExecution(
      afficher_soldes,
      "read_balance_mapping",
      [pAleoTokenOwnerHash],
    );
  console.log("balance_pub", balance_pub);
  console.log("balance_prv", balance_prv);
  console.log("balance_pub", balance_pub.toString());
    res.status(200).json({ pAleoTokenOwnerHash, pondoTokenOwnerHash });*/
  }
    const wallets = useMemo(
      () => [
        new LeoWalletAdapter({
          appName: "Leo Demo App",
        }),
      ],
      []
    );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.TestnetBeta}
      autoConnect
    >
      <WalletModalProvider>
    <>
    <div>
        <a href="https://provable.com" target="_blank">
          <img src={aleoLogo} className="logo" alt="Aleo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Mint & Balances </h1>
    <center>
      <LeowalletGestion />
      </center>
      <p>
          <button disabled={deploying} onClick={deploy}>
            {deploying
              ? `Deploying...check console for details...`
              : `Deploy afficher_soldes.aleo`}
          </button>
        </p>
        <button onClick={handler}>
          
        </button>
    </>
    </WalletModalProvider>
    </WalletProvider>
  );
};

export default App;
