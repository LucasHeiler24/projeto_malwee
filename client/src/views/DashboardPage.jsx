import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    
    const navegate = useNavigate();
    const [token, setToken] = useState(null);
    const [nomeUser, setNomeUser] = useState(null);
    const [idUser, setIdUser] = useState(null);
    
    useEffect(() => {
        (async () => {
            const token = Cookies.get('token');
            if(!token) return navegate('/');
            
            try{
                const response = await fetch(`http://localhost:8000/user/token/${token}`);
                const status = await response.json();

                if(status == 400) navegate('/');

                Cookies.set('id', status.id, {expires: 1});
                Cookies.set('nome', status.nome, {expires: 1});

                setNomeUser(Cookies.get('nome'))
                setIdUser(Cookies.get('id'))
            }
            catch(e){
                console.log(e);
            }

        })()

    }, [token]);

    return (
        <>
            <h1>{nomeUser}</h1>
            <h1>{idUser}</h1>
        </>
    )
}

export default DashboardPage;

// export default function DashboardPage() {
//   return (
//     <main className='App'>
//       <Sidebar>SidebarItem</Sidebar>
//     </main>
//   );
// }
