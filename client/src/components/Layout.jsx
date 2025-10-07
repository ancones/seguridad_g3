import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import LayoutAuth from "./ui/layout/LayoutAuth";

const Layout = () => {
    const { auth } = useAuth();

    return (
        auth?.roles
            ?   <>  
                    <LayoutAuth />
                </>
            :   <main className="App auth">
                    <Outlet />
                </main>
       
    )
}

export default Layout