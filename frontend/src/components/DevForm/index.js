import React, {useEffect, useState} from "react";
import './styles.css'

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [github_username, setGithubUsername] = useState("")
    const [techs, setTechs] = useState("")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords
                setLatitude(latitude)
                setLongitude(longitude)
            },
            error => {
                console.log({error})
            },
            {
                timeout: 30000
            }
        )
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        const dev = {techs, github_username, latitude, longitude}

        await onSubmit(dev)

        setGithubUsername('')
        setTechs('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    value={github_username}
                    onChange={event => setGithubUsername(event.target.value)}
                    required
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        value={latitude}
                        onChange={event => setLatitude(event.target.value)}
                        required
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        value={longitude}
                        onChange={event => setLongitude(event.target.value)}
                        required/>
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm