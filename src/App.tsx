import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UseWalletProvider } from 'use-wallet'
import useStore, { config } from './useStore';
import mapping, { accountMappting, authMappting } from './RouterMapping'
import Layout from './Layout';
import './app.scss'

function App() {
	const {cookie, setCookie, account} = useStore()
	const chainId = config.chainId
	const rpcUrl = config.rpc

	React.useEffect(()=>{
		if (cookie===undefined) setCookie()
	}, [cookie])
	return (
		<UseWalletProvider
			chainId={chainId}
			connectors={{
				portis: { dAppId: 'my-dapp-id-123-xyz' },

				injected: {
					chainId,
					supportedChainIds: [chainId], //, NETWORK_CHAIN_IDS.mainnet
				},

				walletlink: {
					chainId: 1,
					url: rpcUrl,
					appName: "AxisChain Bridge",
				},

				walletconnect: {
					rpcUrl
					// rpc: { [chainId]: rpcUrl }
				},
			}}
		>
			<BrowserRouter>
				<Switch>
					<Layout>
						{Object.keys(mapping).map((url, k) => (<Route exact key={k} path={url} component={mapping[url]} />))}
						{account===null && Object.keys(authMappting).map((url, k) => (<Route exact key={k} path={url} component={authMappting[url]} />))}
						{account!==null && Object.keys(accountMappting).map((url, k) => (<Route exact key={k} path={url} component={accountMappting[url]} />))}
					</Layout>
				</Switch>
				<ToastContainer />
			</BrowserRouter>
		</UseWalletProvider >
	);
}

export default App;
