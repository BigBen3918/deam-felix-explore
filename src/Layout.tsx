import React from 'react';
import { Link } from "react-router-dom";
import useStore from './useStore';

import { config } from './useStore'
import Icons from './components/Icons';
import Loading from './components/Loading';

import MetaMaskImg from "./metamask.svg";

interface LayoutStatus {
	isOpen: boolean,
	dropdownActive: number,
	// isLogin: boolean
}

const onCloseHandle = (onHandle, isOpen, ref) => {
	if(!ref.current) {
		return
	}

	if(!isOpen) {
		return
	}

	const onEscapeHandle = (e) => {
		if(e.key === "Escape") {
			onHandle()
		}
	}

	const onOutsideClickHandle = (e) => {
		if(!ref.current.contains(e.target)) {
			onHandle()
		}
	}

	document.addEventListener("keydown", onEscapeHandle)
	document.addEventListener("mousedown", onOutsideClickHandle)
	ref.current.querySelectorAll("a").forEach(item => {
		item.addEventListener("click", onHandle)
	})

	return () => {
		document.removeEventListener("keydown", onEscapeHandle)
		document.removeEventListener("mousedown", onOutsideClickHandle)
		ref.current.querySelectorAll("a").forEach(item => {
			item.removeEventListener("click", onHandle)
		})
	}
}

const Layout = (props: any) => {
	const { loading, T, theme, update, account } = useStore()

	const [status, setStatus] = React.useState<LayoutStatus>({
		isOpen: false,
		dropdownActive: -1,
	});
	
	const headerContainer = React.useRef(null)

	React.useEffect(() => {
		onCloseHandle(() => setStatus({...status, isOpen: false}), status.isOpen, headerContainer)
	}, [status.isOpen])


	return (
		<div className={`root ${theme} ${status.isOpen ? "open-menu" : ""}`}>
			<header ref={headerContainer}>
				<section className="header container">
					<Link className="logo" to="/">
						<img src="/logo.svg" alt="logo" width="32px" />
						<b style={{fontSize:'2em'}}>{T('title')}</b>
						
						{config.beta ? (
							<sup className='badge badge-danger badge-pill'>beta</sup>
						) : (
							config.testnet && <sup className='badge badge-danger badge-pill'>Testnet</sup>
						)}
					</Link>
					<menu>
						<button className="hamburger" onClick={() => setStatus({ ...status, isOpen: !status.isOpen })}><span></span></button>
						<ul className="menu">
							<li><Link to="/">Home</Link></li>
							<li>
								<button className={status.dropdownActive === 1 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 1 ? -1 : 1) })}>{T('menu.blockchain')}<Icons.ChevronDown /></button>
								<div className='sub-menu'>
									<div className='common'>
										<div className='flex column'>
											<Link to="/accounts">{T('menu.blockchain.top')}</Link>
										</div>
										<div className='flex column'>
											<Link to="/txs">{T('menu.blockchain.txn')}</Link>
											<Link to="/Pending">{T('menu.blockchain.pending')}</Link>
											<Link to="/txsInternal">{T('menu.blockchain.internal')}</Link>
										</div>
										<div className='flex column'>
											<Link to="/blocks">{T('menu.blockchain.blocks')}</Link>
											<Link to="/contractsVerified">{T('menu.blockchain.contracts')}</Link>
										</div>
									</div>
								</div>
							</li>
							<li>
								<button className={status.dropdownActive === 2 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 2 ? -1 : 2) })}>{T('menu.staking')}<Icons.ChevronDown /></button>
								<div className="sub-menu">
									<div className='common'>
										<div className='flex column'>
											<Link to="/validators">{T('menu.staking.validators')}</Link>
											<Link to="/epochs">{T('menu.staking.epochs')}</Link>
										</div>
									</div>
								</div>
							</li>
							<li>
								<button className={status.dropdownActive === 3 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 3 ? -1 : 3) })}>{T('menu.tokens')}<Icons.ChevronDown /></button>
								<div className="sub-menu">
									<div className='common'>
										<div className='flex column'>
											<Link to="/tokens">{T('menu.tokens.erc20')}</Link>
											<Link to="/tokentxns">{T('menu.tokens.erc20transfer')}</Link>
										</div>
										<div className='flex column'>
											<Link to="/tokens-nft">{T('menu.tokens.erc721')}</Link>
											<Link to="/tokentxns-nft">{T('menu.tokens.erc721transfer')}</Link>
										</div>
										<div className='flex column'>
											<Link to="/tokens-nft1155">{T('menu.tokens.erc1155')}</Link>
											<Link to="/tokentxns-nft1155">{T('menu.tokens.erc1155transfer')}</Link>
										</div>
									</div>
								</div>
							</li>
							<li>
								<button className={status.dropdownActive === 4 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 4 ? -1 : 4) })}>{T('menu.resources')}<Icons.ChevronDown /></button>
								<div className="sub-menu">
									<div className='common'>
										<div className='flex column'>
											<Link to="/charts">{T('menu.resources.charts')}</Link>
											<Link to="/topstat">{T('menu.resources.topstat')}</Link>
										</div>
									</div>
								</div>
							</li>
							<li className='sub-right'>
								<button className={status.dropdownActive === 5 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 5 ? -1 : 5) })}>More<Icons.ChevronDown /></button>
								<div className='sub-menu menu-details'>
									<div>
										<span><b>Developers</b></span>
										<ul>
											<li><Link to="https://docs.etherscan.io">{T('menu.more.api')}</Link></li>
											<li><Link to="/opcode-tool">{T('menu.more.opcode')}</Link></li>
											<li><Link to="/pushTx">{T('menu.more.broadcast')}</Link></li>
											{/* <li><Link to="/vyper">{T('menu.more.vyper')}</Link></li> */}
											<li><Link to="/verifiedSignatures">{T('menu.more.verified_sign')}</Link></li>
											<li><Link to="/searchcontract">{T('menu.more.contract_searh')}</Link></li>
											<li><Link to="/contractdiffchecker">{T('menu.more.contract_diff_checker')}</Link></li>
										</ul>
									</div>
									<div>
										<span><b>Tools</b></span>
										<ul>
											<li><Link to="/gastracker">{T('menu.more.gas_tracker')}</Link></li>
											<li><Link to="/verifyContract">{T('menu.more.verify')}</Link></li>
											<li><Link to="/tokenapprovalchecker">{T('menu.more.token_approvals')}</Link></li>
											{/* <li><Link to="/labelcloud">{T('menu.more.label_word_cloud')}</Link></li> */}
											<li><Link to="/unitconverter">{T('menu.more.unit_converter')}</Link></li>
											<li><Link to="https://chat.blockscan.com">{T('menu.more.blockscan_chat')}</Link></li>
										</ul>
									</div>
								</div>
							</li>
							<li className="sub-right">
								{account===null ? (
									<Link to="/login"><Icons.UserCircle className='m-r-1' /> {T('menu.login')}</Link>
								) : (
									<>
										<button className={status.dropdownActive === 6 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 6 ? -1 : 6) })}><Icons.UserCircle className='mr' /> {"Felix"}<Icons.ChevronDown /></button>
										<div className="sub-menu">
											<div className='common'>
												<div className='flex column'>
													<Link to="/myaccount">{T('menu.my')}</Link>
												</div>
												<div className="flex column">
													<Link to="/myaddress">{T('menu.my.watch_list')}</Link>
													<Link to="/mynotes-address">{T('menu.my.txn_private_notes')}</Link>
													<Link to="/mytokenignore">{T('menu.my.token_ignore_list')}</Link>
												</div>
												<div className="flex column">
													<Link to="/myapikey">{T('menu.my.api_keys')}</Link>
													<Link to="/myverify-address">{T('menu.my.verified_address')}</Link>
													<Link to="/mycustomabi">{T('menu.my.custom_abi')}</Link>
												</div>
												<div className="logout-field">
													<button className='btn btn-primary btn-block'>{T('menu.logout')}</button>
												</div>
											</div>
										</div>
									</>
								)}
							</li>
							<li className='sub-right'>
								<button className={status.dropdownActive === 6 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 6 ? -1 : 6) })}><img src='/logo.svg' width="20px" alt='Logo' /></button>
								<div className="sub-menu">
									<div className='common'>
										<div className='flex column'>
											<Link to="https://axisscan.com">{config.symbol} {T('menu.network.main')}</Link>
											<Link to="https://testnet.axisscan.com">{config.symbol} {T('menu.network.test')}</Link>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</menu>
				</section>
			</header>
			<main>
				{props.children}
			</main>
			{loading && <Loading />}
			<footer>
				<section className='container'>
					<div className="footer-content">
						<div>
							<Link to="/"><img src="/logo.svg" alt="logo" /></Link>
							<span className='gray'>Powered by {config.chain}</span>
						</div>
						<div>
							<div>
								<button className='btn btn-info d-middle'><img src={MetaMaskImg} alt="metamask" width={18} />Add {config.chain} {config.testnet ? 'Testnet' : 'Mainnet'}</button>
								<button className='btn btn-info d-middle'>Preferences</button>
								<button className="btn btn-info d-middle" onClick={() => { update({ theme: (theme === "dark-theme" ? "" : "dark-theme") }) }}>
									{theme === "dark-theme" ? <Icons.Moon/> : <Icons.Sun/>}
								</button>
							</div>
						</div>
					</div>
				<div className="copy-right">{config.title} © 2022 ({config.chain}) | ⛏ Built by the same team behind <Link to={`https://scan.deamchain.com`}>Deamchain</Link></div>
				</section>
			</footer>
		</div >
	);
}

export default Layout;