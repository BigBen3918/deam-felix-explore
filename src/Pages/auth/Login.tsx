import React from 'react';
import { Link } from 'react-router-dom';


interface LoginStatus {
    username: string
    password: string
}

const Login = () => {
    const [status, setStatus] = React.useState<LoginStatus>({
        username: "",
        password: ""
    });

    return (
        <div className='login'>
            <section className='container log-form'>
                <h3>Welcome back</h3>
                <p>Login to your account</p>
                <div className='form'>
                    <div className='input-field'>
                        <label>Username</label>
                        <input type="text" className='input input-block' placeholder='Username' value={status.username} onChange={(e) => setStatus({ ...status, username: e.target.value })}></input>
                    </div>
                    <div className='input-field'>
                        <label>Password<Link to="/lostpassword"><small className='gray'>Forgot your password?</small></Link></label>
                        <input type="password" className='input input-block' placeholder='Password' value={status.password} onChange={(e) => setStatus({ ...status, password: e.target.value })}></input>
                    </div>
                    <div>
                        <input type="checkbox" /> Remember & Auto Login
                    </div>
                </div>
                <div className="flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <span>Don't have an account?&nbsp;<Link to="/register">Click to Sign Up</Link></span>
                    <button className='btn btn-primary'>LOGIN</button>
                </div>
            </section>
        </div >
    )
};

export default Login;