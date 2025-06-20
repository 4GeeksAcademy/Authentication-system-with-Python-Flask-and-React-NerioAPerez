import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => { 
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch({type:"set_user", payload: false})
		sessionStorage.removeItem("access_token")
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{ store.currentUser && 
						<button className="btn btn-danger" onClick={handleLogout}>Logout</button>					
					} 
					{!store.currentUser && 
						<Link to="/registration">
						<button className="btn btn-primary">Registration</button>
					</Link>
					}					
				</div>
			</div>
		</nav>
	);
};