import { useState,useEffect } from 'react'
import './app.css'
import Logo from "./novaFarma.jpeg"



function App() {
  const [msg, setMsg] = useState('')

  const aviso = (msg) => {
    setMsg(msg)
    setTimeout(() => {
      setMsg('')
    }, 2000)
  }


   const [falta, setFalta] = useState(()=>{
      const faltasSalvas = localStorage.getItem('listaFaltas')
      return faltasSalvas ? JSON.parse(faltasSalvas) : []
   }
  )

  useEffect(()=>{
    localStorage.setItem('listaFaltas', JSON.stringify(falta))
  },[falta])

  const [novaFalta,setNovaFalta] = useState('')

  const adicionarFalta = () => {
    const faltaFormatada = novaFalta.trim().toLowerCase()

    if(faltaFormatada === ''){
      aviso('Digite uma falta')
      return
    }
    if(falta.includes(faltaFormatada)){
      aviso('Falta já existe')
      return
    }
    setFalta([...falta, faltaFormatada])
    setNovaFalta('')
    
  }

  const removerFalta = (item) =>{
    const novaLista = falta.filter((f,i)=> f !== item)
    setFalta(novaLista)
    aviso('Falta removida')

  }




  return (
    <>
    <header>
      <img src={Logo} alt="logo" />
      <h1>NovaFarma</h1>

    </header>
    <div>
      <h2>Lista de Faltas</h2>
      <section>
        <label>Falta:</label>
        <input
          type="text"
          value={novaFalta}
          onChange={(e) => setNovaFalta(e.target.value)}
          placeholder="Digite a falta"
        />
        <button onClick={adicionarFalta}>
          Adicionar
        </button>
      </section>
      <section>
        <h3>Lista de faltas</h3>
        <ul>
          {falta.map((f,i)=>(
            <li key={i}>
              {f}
              <button onClick={()=>removerFalta(f)}>
                X
              </button>
            </li>
          ))}
        </ul>
        {msg && <p>{msg}</p>}
      </section>
    </div>   
    </>
  )
}

export default App
