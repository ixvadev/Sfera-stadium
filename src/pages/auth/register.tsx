import React, { useRef } from "react"
import { apiUrl } from "../../helpers/api/url"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Register: React.FC = () => {
    const firstname = useRef<HTMLInputElement>(null)
    const lastName = useRef<HTMLInputElement>(null)
    const phoneNumber = useRef<HTMLInputElement>(null)
    const isRole = useNavigate()
    function isRegister() {
        type User = {
            "firstName": string,
            "lastName": string,
            "phoneNumber": string,
        }
        let registerUser: User = {
            "firstName": firstname.current?.value || "",
            "lastName": lastName.current?.value || "",
            "phoneNumber": phoneNumber.current?.value || "",
        }
        console.log(registerUser);
        if (firstname.current?.value && lastName.current?.value && phoneNumber.current?.value) {
            console.log(apiUrl + '/api/v1/auth/register');

            axios.post(apiUrl + '/api/v1/auth/register?ROLE_NAME=CLIENT', registerUser)
                .then((res: AxiosResponse) => {
                    console.log(res)
                    if (res.data.data) {
                        localStorage.getItem('token' + res.data.data.token)
                        if (res.data.data.token == "ROLE_SUPER_ADMIN") {
                            isRole('/admin')
                        } else if (res.data.data.token == "ROLE_MASTER") {
                            isRole('/master')
                        } else {
                            isRole('/client')
                        }
                    }
                })
                .catch((err: AxiosError) => {
                    console.log(err)
                    toast.error(err.message)
                })
        } else {
            toast.warning('joylarni tuldiring')
        }
    }
    return (
        <div>
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="flex mx-auto  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                create accaunt
                            </h3>

                        </div>
                        <div className="p-4 md:p-5">
                            <div>
                                <label className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">first Name</label>
                                <input ref={firstname} type="text" placeholder="first name enter" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">last Name</label>
                                <input ref={lastName} type="text" name="password" id="password" placeholder="last name enter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone Number</label>
                                <input ref={phoneNumber} type="text" id="password" placeholder="phone Number enter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>


                            <button onClick={isRegister} type="submit" className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register