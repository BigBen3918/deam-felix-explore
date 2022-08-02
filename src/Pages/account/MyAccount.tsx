import React from "react"
import AccountLayout, { BreadcrumbObject } from "./AccountLayout";
import myAccount from "../../mockup/myaccount.json";
import { config } from "../../useStore";
import "./index.scss";
import Icons from "../../components/Icons";
import { Link } from "react-router-dom";

interface MyAccountObject {
    username:                 string
    email:                    string
    lastLogin:                number
    totalEthBalance:          number
    emailNotif:               number
    emailNotifLimit:          number
    addressWatchList:         number
    addressWatchListLimit:    number
    txnNotes:                 number
    txnNotesLimit:            number
    addressTags:              number
    addressTagsLimit:         number
    apiKeyUsage:              number
    apiKeyUsageLimit:         number
    verifiedAdresses:         number
    verifiedAdressesStatus:    boolean
}

interface BlockStatus {
    myAccount: MyAccountObject
    tabIndex: number
}

interface RowInfo {
    title: string
    content: any
    des: string
}

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "Account Setting",
        url:            "/myaccount",
        active:         true
    }
] as BreadcrumbObject[]

const MyAccount = () => {
    const [status, setStatus] = React.useState<BlockStatus>({
        myAccount: myAccount,
        tabIndex: 0,
    });

    const data = [
        {
            title: "Personal Info",
            items: [
                {
                    label: "Your username",
                    text: <b>{status.myAccount.username}</b>,
                    tip: null,
                    icon: <Icons.PersonCircle />
                },
                {
                    label: "Your Email Address",
                    text: <b>{status.myAccount.email}</b>,
                    tip: null,
                    icon: <Icons.Email />
                },
                {
                    label: "Last Login",
                    text: <span>{status.myAccount.lastLogin}</span>,
                    tip: null,
                    icon: <Icons.RightInBox />
                }
            ],
            desc: "Below are the username, email and overview information for your account."
        },
        {
            title: "Overview Usage",
            items: [
                {
                    label: `Total ${config.symbol} Balance`,
                    text: `${status.myAccount.totalEthBalance} ${config.symbol}`,
                    tip: null,
                    icon: <Icons.Wallet />
                },
                {
                    label: "Your Email Address",
                    text: `${status.myAccount.emailNotif} emails sent out`,
                    tip: null,
                    icon: <Icons.Email />
                },
                {
                    label: "Address Watch List",
                    text: <Link to="/myaddress">{status.myAccount.addressWatchList} address alert(s)</Link>,
                    tip: `${status.myAccount.addressWatchListLimit} limit`,
                    icon: <Icons.Heart />
                },
                {
                    label: "Txn Private Notes",
                    text: <Link to="/mynotes_tx">{status.myAccount.txnNotes}transaction private note(s)</Link>,
                    tip: `${status.myAccount.txnNotesLimit} limit`,
                    icon: <Icons.File />
                },
                {
                    label: "Address Tags",
                    text: <Link to="/mynotes_address">{status.myAccount.addressTags} address tag(s)</Link>,
                    tip: `${status.myAccount.addressTagsLimit} limit`,
                    icon: <Icons.Paper />
                },
                {
                    label: "API Key Usage",
                    text: <Link to="/myapikey">{status.myAccount.apiKeyUsage} active API(s)</Link>,
                    tip: `${status.myAccount.apiKeyUsageLimit} limit`,
                    icon: <Icons.Key />
                },
                {
                    label: "Verified Address",
                    text: <Link to="/myverify_address">{status.myAccount.verifiedAdresses} verified addresses</Link>,
                    tip: status.myAccount.verifiedAdressesStatus?"Limited":"Unlimited",
                    icon: <Icons.PatchCheck />
                }
            ],
            desc: "Below are the username, email and overview information for your account."
        }
    ]

    return (
        <div className="container">
            <AccountLayout 
                menuKey="myaccount"
                title="Account Settings"
                desc="This page provides an overview of your Ft,Scam account. You can also update your email address or password here."
                breadcrumb={breadcrumbData}
            >
                <div>
                    {
                        data.map((p, k) => (
                            <div className="panel m-b-2" key={k}>
                                <div className="panel-header">
                                    <h4>{p.title}</h4>
                                </div>
                                <div className="panel-content list">
                                    <p>{p.desc}</p>
                                    {p.items.map((i, k2) => (
                                        <div key={k2}>
                                            <span>{i.icon}{i.label}:</span>
                                            <span>
                                                {i.text}
                                                {i.tip && (<small className="gray">{i.tip}</small>)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </AccountLayout>
         </div>
    )
};

export default MyAccount;