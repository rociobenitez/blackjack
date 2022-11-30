/*
    2C = Two of Clubs (tréboles)
    2D = Two of Diaminds (diamantes)
    2H = Two of Hearts (corazones)
    2S =Two of Spades (espadas)
*/

const miModulo = (()=>{
    'use strict';

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [],
        mensaje='';

    // Elementos del DOM - Referencias al HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnNuevo = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener');

    const divCartas = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Inicializa el juego
    const iniciarJuego = (numJugadores = 2) => {
      deck = crearDeck();
      puntosJugadores = [];
      for( let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);
      }
      puntosHTML.forEach(item => item.innerText = 0);
      divCartas.forEach(item => item.innerHTML= '');

      btnPedir.disabled=false;
      btnDetener.disabled=false;
    }

    // Esta función crea una nueva baraja:
    const crearDeck = () => {
      deck = [];  // reinicializando el deck
      for(let i=2; i<=10; i++){
        for(let tipo of tipos){
          deck.push(i + tipo);
        }   
      }
      for(let tipo of tipos){
        for(let especial of especiales){
          deck.push(especial + tipo);
        }
      }
      return _.shuffle(deck);  // baraja las cartas
    }

    // Esta función me permite pedir una carta:
    const pedirCarta = () =>{
        if(deck.length === 0){
        throw 'No hay cartas en la baraja';  // muestra un error en consola
        }
        return deck.pop();  // carta de la baraja
    }

    // Esta función permite conocer el valor de la carta
    const valorCarta = (carta) =>{
        const valor = carta.substring(0, carta.length-1);  // quitarle la letra
        return(isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1; 
    }

    // turno: 0 = primer jugador y el último será la computadora
    const sumarPuntos = (carta,turno) => {
      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
      puntosHTML[turno].innerHTML = puntosJugadores[turno];
      return puntosJugadores[turno]
    }

    // Crear la carta:
    const crearCarta = (carta,turno) => {
      const imgCarta = document.createElement('img');
      imgCarta.src=`assets/cartas/${carta}.png`;  
      imgCarta.classList.add('carta');
      divCartas[turno].append(imgCarta);
    }

    const determinarGanador = () => {
      const [puntosMinimos, puntosComputadora] = puntosJugadores;
      setTimeout(()=>{
        if(puntosComputadora === puntosMinimos){
            alert('¡Empate! Nadie gana');
        }else if(puntosComputadora > 21){
            alert('¡Ganaste!');
        }else{
            alert('¡La computadora gana!');
        }
      }, 100);
    }
    // Turno de la computadora:
    const turnoComputadora = (puntosMinimos) => {
      let puntosComputadora = 0;
        do{
          const carta = pedirCarta();
          puntosComputadora = sumarPuntos(carta,puntosJugadores.length - 1);
          crearCarta(carta,puntosJugadores.length - 1);
        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
      determinarGanador();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
      const carta = pedirCarta();
      const puntosJugador = sumarPuntos(carta, 0);
      crearCarta(carta,0);

      // Evaluar la puntuación del jugador:
      if(puntosJugador > 21){
        alert('Lo siento mucho, perdiste');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
      }else if(puntosJugadores===21){
        alert('¡21, Genial!');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
      }
    });

    btnDetener.addEventListener('click', ()=>{
      btnPedir.disabled=true;
      btnDetener.disabled=true;
      turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', ()=>{
      iniciarJuego();
    });  


  return {
    nuevoJuego: iniciarJuego
  };


})();  //LOAD


