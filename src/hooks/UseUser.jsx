import { useContext } from 'react'
import { UserContext } from '../context/user'

export function UseUser() {
    
    const {user, setUser} = useContext(UserContext);

    const resetUser = () => {
        sessionStorage.removeItem("userId");
        setUser();
    };

    return {user, setUser, resetUser};
}

