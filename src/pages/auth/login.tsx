import axios, { AxiosError, AxiosResponse } from "axios"
import React, { useRef } from "react"
import { apiUrl } from "../../helpers/api/url"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const isRole = useNavigate()
    const userName = useRef<HTMLInputElement>(null)
    const parol = useRef<HTMLInputElement>(null)
    interface User {
        phone: string,
        password: string,
    }
    function getLogin() {
        let user: User = {
            "phone": userName.current?.value || '',
            "password": parol.current?.value || '',
        }
        console.log(user);
        if (userName.current?.value && parol.current?.value) {
            axios.post(apiUrl + '/api/v1/auth/login', user)
                .then((res: AxiosResponse) => {
                    console.log(res)
                    console.log(res.data.data.role);
                    if (res.data.data.role == "ROLE_SUPER_ADMIN") {
                        isRole('/admin')
                    }else if (res.data.data.role == "ROLE_MASTER") {
                        isRole('/master')
                    }
                    localStorage.getItem('token' + res.data.data.token)
                }
                )
                .catch((err: AxiosError) => console.log(err))
        }
    }

    return (
        <div>
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="flex mx-auto  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>

                        </div>
                        <div className="p-4 md:p-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your user name</label>
                                <input ref={userName} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input ref={parol} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div className="flex justify-between">

                            </div>
                            <button onClick={getLogin} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login