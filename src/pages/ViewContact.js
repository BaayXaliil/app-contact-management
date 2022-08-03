import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getSingleUser } from '../redux/action';


function ViewContact({setVisible}) {
    const { id } = useParams();
    let dispatch = useDispatch();
    const { user } = useSelector((state) => state.data)

    useEffect(() => {
        dispatch(getSingleUser(id));
        setVisible(true);
    }, [])
    return (
        <div className="site-card-border-less-wrapper">
            <Card
                title="Contact information"
                bordered={false}
                style={{
                    width: '100%',
                }}
            >
                <p>Je m'appelle <b>{user.name}</b></p>
                <p>J'habite à <b>{user.address}</b></p>
                <p>Vous Pouvez me contacter sur le numéro <i>{user.contact}</i> <br /> ou m'envoyer un e-mail: <i>{user.email}</i></p>
                <Link to='/' className='link'><ArrowLeftOutlined style={{'marginRight': '10px'}} />Retour à la page d'accueil</Link>
            </Card>
        </div>
    )
}

export default ViewContact