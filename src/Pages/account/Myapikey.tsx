import React from "react"
import { Link } from "react-router-dom";

import AccountLayout, { BreadcrumbObject } from "./AccountLayout";
import Table, {TableHeader} from "../../components/Table"
import Icons from "../../components/Icons";
import Dialog from '../../components/Dialog';
import { config } from "../../useStore";

interface MyaccountStatus {
	myApiKeyList:         any
	count:              number
	page:               number
    showEditDialog:     boolean
    showDelDialog:      boolean
    modalData:          any
    apiPlan:            string
    call:               number
}

const myApiKeyList = [
    {
        appName:       "Web3 Project",
        apiKeyToken:   "Deam",
        apiStatistics: "sdfsdfsdf"
    },
    {
        appName:       "Web3 Project",
        apiKeyToken:   "Deam",
        apiStatistics: "sdfsdfsdf"
    },
    {
        appName:       "Web3 Project",
        apiKeyToken:   "Deam",
        apiStatistics: "sdfsdfsdf"
    }
]

const breadcrumbData = [
    {
        title:          "Home",
        url:            "/"
    },
    {
        title:          "API Keys",
        url:            "/myapikey",
        active:         true
    }
] as BreadcrumbObject[]

const MyAddress = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		myApiKeyList:       myApiKeyList,
		count:              25,
		page:               0,
        showEditDialog:     false,
        showDelDialog:      false,
        apiPlan:            "FREE API PLAN",
        call:               5,
        modalData:          {
            appName:        "",
            apiKeyToken:    "",
            apiStatistics:  ""
        }
	});

	React.useEffect(() => {
		setStatus({ ...status, page: 0 });
	}, [status.count]);

    const showAdd = () => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            appName:        ""
        }})
    }

    const showEdit = (k) => {
        setStatus({...status, showEditDialog: true, modalData: {
            ...status.modalData,
            appName:        myApiKeyList[k].appName
        }})
    }
    
    const onEditClose = () => setStatus({...status, showEditDialog: false});

    const onDelClose = () => setStatus({...status, showDelDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.vale}})
    }

	const fields = [
		{key: 'appName',        label: 'App Name',              render: (v:string, i)=>(
			<>
				<Link to={`txs/${v}`}>{v}</Link>
				<p>{i.desc}</p>
			</>
		)},
		{key: 'apiKeyToken',    label: 'API Key Token',         render: (v:number)=>(v)},
		{key: 'apiStatistics',  label: 'API Statistics',        render: (v:number)=>(v)},
		{key: 'desc',           label: '',		                render: (v:string, i, k)=>(
			<div className="flex">
                <button className="btn m-r-1 d-middle"onClick={() => showEdit(k)}>Edit<Icons.Delete size={13} /></button>
				<button className="btn" onClick={()=>setStatus({...status, showDelDialog: true})}><Icons.Delete size={13} /></button>
			</div>
		)}
	] as TableHeader[]

	return (
		<div className="container">
            <AccountLayout 
                menuKey="myapikey"
                title="API Keys"
                desc="api keys"
                breadcrumb={breadcrumbData}
            >
                <>
                    <div className="panel m-b-2">
                        <div className="panel-header d-middle justify-content-between">
                            <h4>My API Keys</h4>
                            <button className="btn" onClick={showAdd}>Add</button>
                        </div>
                        <p>For developers interested in building applications using our API Service, please create an API-Key Token which you can then use with all your API requests.</p>
                        <div className="panel-content">
                            <Table
                                header={(
                                    <div>{myApiKeyList.length} key added (out of 3 max limit)</div>
                                )}
                                data={myApiKeyList}
                                fields={fields}
                                page={status.page}
                                total={status.count}
                            ></Table>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-header">
                            <h4>Current API Plans</h4>
                        </div>
                        <div className="panel-content list">
                            <div>
                                <span>My API Plan:</span>
                                <span>
                                    <b>{status.apiPlan}</b>
                                    <Link className="btn btn-primary" to="/">Upgrade Plan</Link>
                                </span>
                            </div>
                            <div>
                                <span>API calls per second:</span>
                                <b>{status.call} calls</b>
                            </div>
                        </div>
                    </div>
                </>
            </AccountLayout>
            {status.showEditDialog && (
                <Dialog onClose={onEditClose}>
                    <div className="m-b-2">
                        <div>
                            <span className="flex ">App Name</span>
                            <input type="text" name="appName" className="input input-block" placeholder="e.g. Web3 Project" value={status.modalData.appName} onChange={inputChangeHandle} />
                        </div>
                    </div>
                    <div className="text-align-right">
                        <button className="btn m-r-1" onClick={onEditClose}>Cancel</button>
                        <button className="btn btn-primary">Create New API Key</button>
                    </div>
                </Dialog>
            )}
            
            {status.showDelDialog && (
                <Dialog onClose={onDelClose}>
                    <p>
                        Are you sure you wish to unlink the App Name?
                    </p>
                    <div className="text-align-right">
                        <button className="btn m-r-1" onClick={onDelClose}>Cancel</button>
                        <button className="btn btn-primary">Continue</button>
                    </div>
                </Dialog>
            )}
		</div>
	)
};

export default MyAddress;