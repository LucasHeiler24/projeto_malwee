import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navegate = useNavigate();
    navegate('/login');
    
    return(
        <h1>Home</h1>
    )
}

export default HomePage