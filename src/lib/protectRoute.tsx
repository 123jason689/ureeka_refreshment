import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UnauthorizedPage from "@/pages/unauthorized/page"

interface ProtectedRouteProps{
    isAuthenticated: boolean,
    children: React.ReactNode
}

const ProtectRoute:React.FC<ProtectedRouteProps> = ({ isAuthenticated, children })=>{
    if(!isAuthenticated){
        return (<UnauthorizedPage/>);
    }

    return <>{ children }</>

}

export default ProtectRoute;