
import { auth, firestore } from "@/lib/firebase/init";
import { getAllRegion, RegionsType } from "@/lib/utils";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function Register() {

    const navigate = useNavigate();
    const [remember, setRemember] = useState();
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        address: "",
        phone: "",
        region: "",
        isAdmin: false,
        remember: false
    });
    const { email, name, password, address, phone, region } = form;
    const [regions, setRegions] = useState<RegionsType[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/")
            }
        })
        return () => unsubscribe()
    }, [navigate])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let errorMessage = "";

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            errorMessage = "Invalid email format.";
        } else if (form.name.length < 3) {
            errorMessage = "Name must be at least 3 characters long.";
        } else if (form.password.length < 6) {
            errorMessage = "Password must be at least 6 characters long.";
        } else if (!form.phone.trim()) {
            errorMessage = "Phone number is required.";
        } else if (!/^\d{10,}$/.test(form.phone)) {
            errorMessage = "Phone number must be at least 10 digits long.";
        } 

        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError("")


        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, "tendant", users.user.uid), {
                name,
                address,
                phone,
                region: doc(firestore, "region", region),
                isAdmin: false,
            })
            alert("User registered successfully!");
            sessionStorage.setItem("user", JSON.stringify({ id: users.user.uid, name: name }))
            setForm({
                email: "",
                name: "",
                password: "",
                address: "",
                phone: "",
                region: "",
                isAdmin: false,
                remember: false
            })
            navigate('/')
        } catch (err: any) {

        }
    }

    useEffect(() => {
        getAllRegion(setRegions)
    },)

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden border">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h2 className="text-2xl font-medium text-slate-700">Register</h2>
                    <p className="text-slate-500">Enter details below.</p>
                </div>
                <form className="w-full mt-4 space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-slate-600">Email</label>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Enter email"
                            id="email"
                            name="email"
                            type="text"
                            value={form.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-slate-600">Username</label>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Enter name"
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-slate-600">Address</label>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Enter address"
                            id="address"
                            name="address"
                            type="text"
                            value={form.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-slate-600">Phone Number</label>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Enter phone number"
                            id="phone"
                            name="phone"
                            type="text"
                            value={form.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                                <Select
                                    id="region"
                                    name="region"
                                    value={form.region}
                                    label="Region"
                                    onChange={handleSelectChange}
                                >
                                    {regions.map((region) => (
                                        <MenuItem key={region.id} value={region.id}> {region.region}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                className="mr-2 w-4 h-4"
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={handleInputChange}
                            />
                            <span className="text-slate-500">Remember me</span>
                        </label>
                        <a className="text-blue-500 font-medium hover:underline" href="#">Forgot Password</a>
                    </div>
                    <button
                        className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
                        id="login"
                        name="login"
                        type="submit"
                    >
                        Login
                    </button>
                    <p className="flex justify-center space-x-1">
                        <span className="text-slate-700">Already have an account?</span>
                        <a className="text-blue-500 hover:underline" href="#" onClick={goToLogin}>Sign In</a>
                    </p>
                    {error}
                </form>
            </div>
        </div>

    );
}
