import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps{
    isAuthenticated: boolean,
    children: React.ReactNode
}

const ProtectRoute:React.FC<ProtectedRouteProps> = ({ isAuthenticated, children })=>{
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if(!isAuthenticated){
        return null;
    }

    return <>{ children }</>

}

export default ProtectRoute;