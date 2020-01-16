import React, { useState, useEffect} from 'react';
import api from './services/api';


import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
// Componente = É um bloco de conteudo html/css/js que não interfere no resto da aplicação - No caso abaixo seria o "App"
//Propriedade = Informações que um componente Pai passa para o componente filho
//Estado = Informação mantidas pelo componente (Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs', data)


    setDevs([...devs, response.data]);
  }

  return ( 
    <div id = "app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
