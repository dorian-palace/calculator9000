import { useState } from 'react';


function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {

    if (
        ops.includes(value) && calc === '' || //Si la dernière value est un opérator et que le calcul n'a pas de résultat
        ops.includes(value) && ops.includes(calc.slice(-1) // Si il y'a une value et qu'il y'a déjà un operator on ne peux pas en rajotuer un 
        )
    ) {
      return;
    }

      setCalc(calc + value);

      if (!ops.includes(value)) {
        //si ce n'est pas un operator ajoute la vallue
          setResult(eval(calc + value).toString());
          //Ajoute la value en string exempte : 1+1=2 PAS 22 !
      }

  }
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      //Création des button de 1 à 9 à l'aide d'une boucle
      digits.push(
        <button onClick={() => updateCalc(i.toString())} 
        key={i}>
          {i}
        </button>
      )
      
    }
    return digits;
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  const deleteLast = () => {
    if (calc == '')
      return;
      
      const value = calc.slice(0, -1);
      //Sinon supprime une string
      setCalc(value);
    }

    const loadData = async () => {

      console.log(calc)
      console.log(typeof(calc))


      const screenValue = document.getElementsByClassName('display')
      // const params = screenValue[0].lastChild
      // console.log(params)


      const formData = new FormData();
      formData.append("screenValue", calc)

      const url = 'http://localhost:8888/calculator9000/src/traitement.php';

     await fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      })
      .then((response) => response)
      .then((data) => {
        console.log(data)
      })
      // var rawResponse = await fetch(url)
    //  await rawResponse.JSON();
      // console.log(response)


    }

  return (
    <div className="App">
        <div className="calculator">
            <div className="display">
                {result ? <span>({result})</span> : ''} 
                { calc || "0"}
            </div>

            <div className="operators">

              <button onClick={() => loadData()} id="saveValue">Save</button>
              <button onClick={() => updateCalc('/')}>/</button>
              <button onClick={() => updateCalc('*')}>*</button>
              <button onClick={() => updateCalc('+')}>+</button>
              <button onClick={() => updateCalc('-')}>-</button>

              <button onClick={deleteLast}>DEL</button>
            </div>

            <div className="digits">
              { createDigits() } 
            <button onClick={() => updateCalc('0')}>0</button>
            <button onClick={() => updateCalc('.')}>.</button>
            <button onClick={calculate}>=</button>
            </div>

        </div>
    </div>
  );
}

export default App;
