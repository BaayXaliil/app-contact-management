import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import React from 'react'

function NotFound() {
    return (
        <div>
            <h1>Erreur 404 !</h1>
            <p>Cette page est introuvable.</p>
            <Link to='/' className='link'><ArrowLeftOutlined style={{'marginRight': '10px'}} />Retour à la page d'accueil</Link>
        </div>
    )
}

export default NotFound