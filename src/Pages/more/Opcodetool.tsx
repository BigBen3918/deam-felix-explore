import React from 'react';

interface OpcodetoolStatus {
    bytecode: string
}

const Opcodetool = () => {
    const [status, setStatus] = React.useState<OpcodetoolStatus>({
        bytecode: ""
    });

    return (
        <div className='opcode-tool'>
            <section className='container'>
                <h3>Bytecode of Opcode Disassember</h3>
                <hr />
                <p>Attempts to decode the low level Contract ByteCodes to Opcodes</p><br />
                <form className='form'>
                    <textarea className='input input-block' rows={15} placeholder="Enter Contract Bytecode (0x..)" onChange={(e) => setStatus({ bytecode: e.target.value })}>{status.bytecode}</textarea><br />
                    <div className='text-align-right'>
                        <button className='btn btn-primary'>Decode</button>
                    </div>
                </form>
                <div className='panel'>
                    <div className="panel-header">
                        <h4>Decode Bytecode:</h4>
                    </div>
                    <div className="panel-content grid-col">
                        <div>[0]LOG1</div>
                    </div>
                </div><br />
            </section>
        </div >
    )
};

export default Opcodetool;