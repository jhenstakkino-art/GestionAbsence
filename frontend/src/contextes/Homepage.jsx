import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiClient } from '../services/api'
import '../styles/Homepage.css'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { MdFingerprint } from 'react-icons/md'


export default function Homepage() {
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const CheckPoint = async () => {
            try {
                const reponse = await apiClient.get('applications.comptes/index/')
                setStatus(reponse.data)

            }
            catch (err) {
                setError(err.message)

            }
            finally {
                setLoading(false)
            }
        }
        CheckPoint()

    }, [])

    return (
        <div className="acceuil-page">
            <h1>Pointy ONIFRA</h1>
            <h3>Bienvenue dans votre application du Gestion de présence et d'absence</h3>

            <div className="card">
                {/*<h2>API Status</h2>*/}
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                {status && (
                    <div>
                        <p className='statut'>✓ Status: {status.status}</p>
                        <p>{status.message}</p>
                    </div>
                )}

                <img src="/src/images/empreinte.jpg" alt="" />
            </div>

            {/*Lien de connexion ou authentification*/}
            <div className="connexion">
                <Link to="/login"><MdFingerprint className="entrer" /></Link>
                <p>Cliquer ici pour vous connecter</p>
            </div>
        </div>
    )

}