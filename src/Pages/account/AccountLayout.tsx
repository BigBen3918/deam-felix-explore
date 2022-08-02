import React from "react"
import { Link } from "react-router-dom"
import Icons from "../../components/Icons"
import "./mymenu.scss"

interface MenuStatus {
	isMenu:         boolean
}

export interface BreadcrumbObject {
	title:			string
	url:			string
	active?:		boolean
}

interface AccountLayoutProps {
	menuKey:		string
	title:			string
	desc?:			string
	breadcrumb?:	BreadcrumbObject[]
	children:		JSX.Element
}

const AccountLayout = ({menuKey, title, desc, children, breadcrumb}: AccountLayoutProps) => {
	const [status, setStatus] = React.useState<MenuStatus>({
		isMenu:     false
	});

	const menuList = [
		{
			label:      "acount",
			items:      [
				{
					url:    "/myaccount",
					title:  "Account Overview",
					key:    "myaccount",
					icon:   <Icons.Home />
				},
				{
					url:    "/mysetting",
					title:  "Account Setting",
					key:    "mysetting",
					icon:   <Icons.UserShield />
				},
				{
					url:    "/myconnect",
					title:  "Deam Connect",
					key:    "myconnect",
					icon:   <Icons.HeadsetVr />
				}
			]
		},
		{
			label:      "Watch list & notes",
			items:      [
				{
					url:    "/myaddress",
					title:  "Watch List",
					key:    "myaddress",
					icon:   <Icons.Heart />
				},
				{
					url:    "/mynotes_address",
					title:  "Private Name Tags",
					key:    "mynotes_address",
					icon:   <Icons.Paper />
				},
				{
					url:    "/mynotes_tx",
					title:  "Txn Private Notes",
					key:    "mynotes_tx",
					icon:   <Icons.File />
				}
			]
		},
		{
			label:      "Others",
			items:      [
				{
					url:    "/mytokenignore",
					title:  "Token Ignore List",
					key:    "mytokenignore",
					icon:   <Icons.Key />
				},
				{
					url:    "/myapikey",
					title:  "API-KEYs",
					key:    "myapikey",
					icon:   <Icons.Check />
				},
				{
					url:    "/myverify_address",
					title:  "Verified Addresses",
					key:    "myverify_address",
					icon:   <Icons.CardList />
				},
				{
					url:    "/mycustomabi",
					title:  "Custom ABIs",
					key:    "mycustomabi",
					icon:   <Icons.EyeSlash />
				}
			]
		}
	]

	return (
		<div>
			<div className="d-middle justify-content-between mb-2">
				<div>
					<h3>{title}</h3>
					<span>
						{breadcrumb?.map((i, k) => (
							<span key={k}>{k!==0 && ` / `}
								{	i.active ? (
										<span className="gray" style={{cursor: "pointer"}}>{i.title}</span>
									) : (
										<Link to={i.url}><u>{i.title}</u></Link>
								)}
							</span>
						))}
					</span>
				</div>
				<button className="btn btn-primary d-middle"><Icons.RightInBox className="mr" />Sign Out</button>
			</div>
			<div className="section-split my-page">
				<div className="col3">
					<div className={`${status.isMenu&&"open-submenu"}`}>
						<div className="panel m-b-2 mymenu">
							<div className="panel-header">
								<h4>felixjan412</h4>
								<small className="gray">felix44291@gmail.com</small>
							</div>
							<span className="hamburger" onClick={()=>setStatus({...status, isMenu: !status.isMenu})}><span></span></span>
							<div className="menu-list">
								{
									menuList.map((u, k) => (
										<ul key={k}>
											<span>{u.label}</span>
											{u.items.map((i, k2) => (
												<li key={k2}><Link to={i.url} className={`btn-block ${menuKey===i.key?"active":""}`}>{i.icon}{i.title}</Link></li>
											))}
										</ul>
									))
								}
							</div>
						</div>
					</div>
					{title && desc && (
						<div className="panel">
							<div>
								<h3>{title}?</h3>
								<p>{desc}</p>
							</div>
						</div>
					)}
				</div>
				<div className="col9">
					{children}
				</div>
			</div>
		</div>
	)
}

export default AccountLayout