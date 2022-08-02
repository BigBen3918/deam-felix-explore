import React from 'react';
import { Link } from 'react-router-dom';


interface RegisterStatus {
    username: string
    email: string
    password: string
    password2: string
}

const Register = () => {
    const [status, setStatus] = React.useState<RegisterStatus>({
        username: "",
        email: "",
        password: "",
        password2: ""
    });

    return (
        <div className='register'>
            <section className='container log-form'>
                <h3>Register a New Account</h3>
                <p className='gray'>Fill out the form to get started</p>
                <div className='form'>
                    <div className='input-field'>
                        <label>Username</label>
                        <input type="text" className='input input-block' placeholder='Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed.' value={status.username} onChange={(e) => setStatus({ ...status, username: e.target.value })}></input>
                    </div>
                    <div className='input-field'>
                        <label>Email Address</label>
                        <input type="text" className='input input-block' placeholder='A confirmation code will be sent to this address' value={status.email} onChange={(e) => setStatus({ ...status, email: e.target.value })}></input>
                    </div>
                    <div className="section-split">
                        <div className="col6">
                            <div className='input-field'>
                                <label>Password</label>
                                <input type="password" className='input input-block' placeholder='Password' value={status.password} onChange={(e) => setStatus({ ...status, password: e.target.value })}></input>
                            </div>
                        </div>
                        <div className="col6">
                            <div className='input-field'>
                                <label>Confirm Password</label>
                                <input type="password" className='input input-block' placeholder='Confirm Password' value={status.password2} onChange={(e) => setStatus({ ...status, password2: e.target.value })}></input>
                            </div>
                        </div>
                    </div>
                    <div className='gray'>
                        <input type="checkbox" /> I agree to the <Link to="/terms">Terms and Conditions</Link>
                    </div>
                    <div className='gray'>
                        <input type="checkbox" /> I agree to receive the FtmScan newsletter and understand that I can unsubscribe at any time.
                    </div>
                </div>
                <div className="flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <span className='gray'>Already have an account?&nbsp;<Link to="/login">Click to Sign In</Link></span>
                    <button className='btn btn-primary'>Create an Account</button>
                </div>
            </section>
        </div >
    )
};

export default Register;