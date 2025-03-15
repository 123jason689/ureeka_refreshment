import { auth } from "@/lib/firebase/init";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if(user){
                navigate("/")
            }
        })
        return () => unsubscribe()
    },[navigate])

    const [remember,setRemember] = useState(false);
    const [error,setError] = useState("")
    const [form, setForm] = useState({ 
        email: "", 
        password: "",
        remember: false
    })

    const {email,password} = form;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const goToRegister = () => {
        navigate("/register");
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const users = await signInWithEmailAndPassword  (auth, email, password);
            alert("User login successfully!");
            if(remember == true){
                sessionStorage.setItem("user",JSON.stringify({id : users.user.uid,name : users.user.displayName}))
            }

            setForm({
                email: "",
                password: "",
                remember: false
            })
            navigate('/')
        } catch (err: any) {
            setError("Email or password is wrong");
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-80 rounded-lg shadow h-auto p-6 relative overflow-hidden border">
            <div className="flex flex-col justify-center items-center space-y-2">
                <h2 className="text-2xl font-medium text-slate-700">Login</h2>
                <p className="text-slate-500">Enter details below.</p>
            </div>
            <form className="w-full mt-4 space-y-3" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-slate-600">Email</label>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                        placeholder="Enter email"
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-slate-600">Password</label>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            className="mr-2 w-4 h-4"
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={remember}
                            onChange={handleChange}
                        />
                        <span className="text-slate-500">Remember me</span>
                    </label>
                    <a className="text-blue-500 font-medium hover:underline" href="#">Forgot Password</a>
                </div>
                {error}
                <button
                    className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
                    id="login"
                    name="login"
                    type="submit"
                >
                    Login
                </button>
                <p className="flex justify-center space-x-1">
                    <span className="text-slate-700">Don't have an account?</span>
                    <a className="text-blue-500 hover:underline" onClick={goToRegister}>Sign Up</a>
                </p>
            </form>
        </div>
        </div>

    );
}
