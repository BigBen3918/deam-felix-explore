import React from 'react';
import { Link } from 'react-router-dom';


interface LostpassStatus {
    username: string
    password: string
}

const Lostpass = () => {
    const [status, setStatus] = React.useState<LostpassStatus>({
        username: "",
        password: ""
    });

    return (
        <div className='lostpass'>
            <section className='container log-form'>
                <h3>Forgot your password?</h3>
                <p>Enter your email address below and you'll get you back on track.</p>
                <div className='form'>
                    <div className='input-field'>
                        <label>Email Address</label>
                        <input type="email" className='input input-block' placeholder='Email Address' value={status.username} onChange={(e) => setStatus({ ...status, username: e.target.value })}></input>
                    </div>
                </div>
                <div className="flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <span><Link to="/login">Back to Sign In</Link></span>
                    <button className='btn btn-primary'>Reset Password</button>
                </div>
            </section>
        </div >
    )
};

export default Lostpass;