import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Collapse from '../../components/Collapse'
import Icons from '../../components/Icons'
import TabBar from '../../components/TabBar'
import mockData from "../../mockup/verifycontract.json"

interface stateObject {
    txAddress:              string
    compilerType:           number
    compilerVersion:        number
    licenseType:            number
}

interface VerifySolcMultipleStatus {
    licenseType:            number
    code:                   string
    option:                 number
    abiEncoded:             string
    libraries:              Array<{name: string, address: string}>
    runs:                   number
    evmVersion:             number
    license:                number
    tabKey:                 string
    isVerified:             boolean
    isSuccessed:            boolean
}

interface OutputObject {
    txHash:                 string
    address:                string
    bytecode:               string
    abi:                    string
}

interface ErrorObject {

}

const VerifySolcMultiple = () => {
    const location = useLocation<stateObject>()
    const { txAddress, compilerType, compilerVersion, licenseType} = location.state

    const [status, setStatus] = React.useState<VerifySolcMultipleStatus>({
        licenseType:        0,
        code:               "",
        option:             0,
        abiEncoded:         "",
        libraries:          [
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
            {name: "", address: ""},
        ],
        runs:               200,
        evmVersion:         0,
        license:            0,
        tabKey:             "Contract Source Code",
        isVerified:         true,
        isSuccessed:        true
    })

    const [output, setOutput] = React.useState<OutputObject>({
        txHash:             "0x4a46cf8c0cb148a3e2b066559bf51434735b81341785950f4dff2d70fa79165d",
        address:            "0x757A84FD6f9Df58466946350cD8dAfB92E8d3dB0",
        bytecode:           "6080604052348015600f57600080fd5b5060ac8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d14604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea2646970667358221220aa14af0fb1bae287269139d260c357070a20fe9b235de483d3a589d4114bd22164736f6c63430008070033",
        abi:                '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
    });

    useEffect(() => {
        setStatus({
            ...status,
            licenseType: licenseType
        })
    }, [])

    const onChange = (e) => {
        setStatus({
            ...status,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
         
        let errs:ErrorObject = {};
    }

	const tabHeader = ['Contract Source Code'] // , 'Comments'
	if (status.isVerified) tabHeader.push('Compiler Output')

    return (

        <div className='verify'>
            <section className='container'>
                <h3 className='text-align-center'>VerifySolcMultiple & Publish Contract Source Code</h3>
                <div className="text-align-center m-b-2">
                    <p className='badge badge-pill badge-info badge-bg m-b-2'>Compiler Type: SINGLE FILE / CONCATENANTED METHOD</p>
                </div>
                <TabBar headers={tabHeader} onChange={tabKey=>setStatus({...status, tabKey})}>
                    {status.tabKey === 'Contract Source Code' && (
                        <form onSubmit={onSubmit}>
                            <div className="p-3">
                                <div className='p-3' style={{backgroundColor: "var(--border)", borderRadius: "10px"}}>
                                    <p className='m-b-2'>1. If the contract compiles correctly at <a href='https://remix.ethereum.org'>REMIX</a>, it should also compile correctly here.</p>
                                    <p className='m-b-2'>2. We have limited support for verifying ocntracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled</p>
                                    <p>3. For programatic contract verification, check out the <Link to="/api-endpoints/contracts">Contract API Endpoint</Link></p>
                                </div>
                            </div>
                            <div className='flex flex-wrap gap'>
                                <div className='input-field'>
                                    <label htmlFor="address">Contract Address</label>
                                    <input type="text" className="input input-block" value={txAddress} readOnly />
                                </div>
                                <div className='input-field'>
                                    <label htmlFor="version">Contract Address</label>
                                    <input type="text" className="input input-block" value={compilerVersion} readOnly />
                                </div>
                                <div className='input-field'>
                                    <label htmlFor="options">Optimization</label>
                                    <select className='input input-block' name="option" id="option" value={status.option} onChange={onChange}>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className='panel'>
                                <div className="input-field">
                                    <label htmlFor="code">Please select the Solidity (*.sol) files for upload *</label>
                                    Step 1: <input type="file" name="code" id="code" className="input m-b-2" onChange={onChange} value={status.code} /><br />
                                    Step 2: <button className="btn">Click to Upload selected files</button>
                                </div>
                            </div>
                            <div>
                                <Collapse header={<p>Constructor Arguments ABI-encoded <span className="gray">(for contracts that were created with constructor parameters)</span></p>}>
                                    <div className="panbel-content">
                                        <textarea name="abiEnabled" id="abiEnabled" rows={5} className="input input-block" value={status.abiEncoded} />
                                    </div>
                                </Collapse>
                                <Collapse header={<p>Contract Library Address <span className="gray">(for contracts that use libraries, supports up to 10 libraries)</span></p>}>
                                    <div className="panbel-content">
                                        {
                                            status.libraries.map((i, k) => (
                                                <div className='flex flex-wrap gap' key={k}>
                                                    <div className="input-field">
                                                        <label htmlFor="">Library_{k + 1} Name:</label>
                                                        <input type="text" className='input input-block' value={i.name} onChange={(e) => {
                                                            console.log(k);
                                                            let libs = status.libraries
                                                            libs[k].name = e.target.value
                                                            setStatus({...status, libraries: libs})
                                                        }} />
                                                    </div>
                                                    <div className="input-field">
                                                        <label htmlFor="">Library_{k + 1} Contract Address:</label>
                                                        <input type="text" className='input input-block' value={i.address} onChange={(e) => {
                                                            let libs = status.libraries
                                                            libs[k].address = e.target.value
                                                            setStatus({...status, libraries: libs})
                                                        }} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Collapse>
                                <Collapse header={<p>Misc Settings <span className="gray">(Runs, EvmVersions & License Type setting)</span></p>}>
                                    <div className="panbel-content flex flex-wrap gap">
                                        <div className="input-field">
                                            <label htmlFor="">Runs</label>
                                            <input type="text" name='runs' className="input input-block" value={status.runs} onChange = {onChange} />
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="">EVN Version to target</label>
                                            <select name='evmVersion' className="input input-block" value={status.evmVersion} onChange = {onChange}></select>
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="">License Type</label>
                                            <select name='license' className="input input-block" value={status.license} onChange = {onChange}></select>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className='text-align-center'>
                                <button type='submit' className='btn btn-primary m-r-1'>Continue</button>
                                <button type='reset' className='btn m-r-1'>Reset</button>
                                <button type='submit' className='btn'>Return to Main</button>
                            </div>
                        
                        </form>
                    )}
                    {status.tabKey === 'Compiler Output' && (
                        status.isSuccessed ? (
                            <>
                                <div className='m-b-2'>
                                    <p className='m-b-1'><strong>Compiler debug log:</strong></p>
                                    <p className='gray d-middle flex-wrap'><Icons.FilledCheck /> &nbsp;Note: Contract was created during TxHash# <Link to={`/tx/${output.txHash}`}>{output.txHash}</Link></p>
                                    <p className='gray d-middle flex-wrap'><Icons.FilledThumbsUp /> &nbsp;Successfully generated ByteCode and ABI for Contract Address <Link to={`/address/${output.address}`}>[{output.address}]</Link></p>
                                </div>
                                <div className='card'>
                                    <div className='m-b-2'>
                                        <small><b>Compiler Version: </b>{compilerVersion}</small><br />
                                        <small><b>Optimization Enabled: {status.option}</b></small><br />
                                        <small><b>Runs: </b>{status.runs}</small>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="">ContractName:</label>
                                        <input type="text" className="input input-block" value='Storage' readOnly />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="">ContractBytecode:</label>
                                        <textarea name="bytecode" id="bytecode" className='input input-block' rows={6} value={output.bytecode} readOnly />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="">ContractABI:</label>
                                        <textarea name="abi" id="bytecode" className='input input-block' rows={6} value={output.abi} readOnly />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='m-b-2'>
                                    <p className='m-b-1'><strong>Compiler debug log:</strong></p>
                                    <p className='danger d-middle flex-wrap'><Icons.Ban /> &nbsp;Error! Unable to generate Contract ByteCode and ABI</p>
                                    <p className='gray d-middle flex-wrap'><Icons.AngleDobleRight /> &nbsp;Found the following ContratNAme(s) in source code:&nbsp;<b> Storage</b></p>
                                    <p className='gray d-middle flex-wrap'><Icons.AngleDobleRight /> &nbsp;But we were unable to locate a matching bytecode (err_code_2)</p>
                                    <p className='gray d-middle flex-wrap'><Icons.FilledExclamationCircle /> &nbsp;For troubleshooting, you can try compiling your source code with the &nbsp;<Link to='https://remix.ethereum.org'>Remix - Solidity IDE</Link>&nbsp; and check for exceptions</p>
                                </div>
                                <div className="card">
                                    <div className='m-b-2'>
                                        <small><b>Compiler Version: </b>{compilerVersion}</small><br />
                                        <small><b>Optimization Enabled: {status.option}</b></small><br />
                                        <small><b>Runs: </b>{status.runs}</small><br />
                                    </div>
                                    <div className="input-field">
                                        <label>ByteCode (What we are looking for):</label>
                                        <textarea className="input input-block" rows={5} value={output.bytecode} readOnly />
                                    </div>
                                    <br />
                                    <p>- vs what we got -</p>
                                    <br />
                                    <div className="input-field">
                                        <span>We tried looking for a match from the list of compiled contract bytecode output (as listed below), but was unable to find an exact match.</span>
                                        <label>Storage:</label>
                                        <textarea className="input input-block" rows={5} value={output.bytecode} readOnly />
                                    </div>
                                </div>
                                <button className="btn btn-primary">Start Over</button>
                            </>
                        )
                    )}
                </TabBar>
            </section>
        </div >

    )
};

export default VerifySolcMultiple;