import React, {useState, useEffect} from 'react';
import './App.css'
import './Sidebar.css'
import './Main.css'
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')

            setDevs(response.data)
        }

        loadDevs()
    }, []);

    async function handleAddDev(dev) {
        const response = await api.post('/devs', dev)

        setDevs([...devs, response.data])
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}/>
            </aside>
            <main>
                <ul>
                    {devs.map(dev =>
                        <DevItem dev={dev} key={dev._id}/>
                    )}
                </ul>
            </main>
        </div>
    );
}

export default App;
