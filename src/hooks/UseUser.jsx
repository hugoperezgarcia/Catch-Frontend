import { useContext } from 'react'
import { UserContext } from '../context/user'

export function UseUser() {
    
    const{user, setUser} = useContext(UserContext);
    return{user, setUser}
}

