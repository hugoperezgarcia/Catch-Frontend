import React from 'react'
import { UseUser } from '../hooks/UseUser'

function Footer() {
    const {user} = UseUser();
    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

export default Footer
