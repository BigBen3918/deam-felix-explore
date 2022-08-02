import React from 'react';

interface PushtxStatus {
    txHex: string
}
const Pushtx = () => {

    const [status, setStatus] = React.useState<PushtxStatus>({
        txHex: ""
    });

    return (
        <div className='pushtx'>
            <section className='container'>
                <h3>Broadcast Raw Transaction</h3>
                <hr />
                <p>This page allows you to paste a Signed Raw Transaction in hex format (i.e. characters 0-9, a-f) and broadcast it over the Fantom network.</p><br />
                <form className='form'>
                    <textarea className='input input-block' rows={15} placeholder="Enter signed transaction hex (0x..)" onChange={(e) => setStatus({ txHex: e.target.value })}>{status.txHex}</textarea><br />
                    <div className='text-align-right'>
                        <button className='btn btn-primary'>Send Transaction</button>
                    </div>
                </form>
            </section>
        </div >
    )
};

export default Pushtx;