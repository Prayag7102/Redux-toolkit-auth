import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApi";

const Dashboard = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    
    const handleLogout = () => {
        logout().then(() => navigate("/login"));
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Dashboard;
