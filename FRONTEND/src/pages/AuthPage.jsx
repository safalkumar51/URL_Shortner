import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="min-h-screen page-bg flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-rose-700">
                        {login ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-slate-600 mt-2">
                        {login ? "Log in to manage your short URLs" : "Sign up to start creating short URLs"}
                    </p>
                </div>
                
                <div className="bg-slate-100 shadow-lg rounded-xl border border-slate-300 overflow-hidden">
                    <div className="grid grid-cols-2 border-b border-slate-300">
                        <button 
                            className={`py-3 font-medium text-center transition-colors duration-200 ${
                                login 
                                ? 'bg-rose-600 text-white' 
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                            onClick={() => setLogin(true)}
                        >
                            Login
                        </button>
                        <button 
                            className={`py-3 font-medium text-center transition-colors duration-200 ${
                                !login 
                                ? 'bg-rose-600 text-white' 
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                            onClick={() => setLogin(false)}
                        >
                            Register
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage