//Questo file opera come storage fra tutti i file utilizzando VUEX, 
//in modo tale da creare una sessione per chi effettua il login.

import { createStore } from 'vuex'

export default createStore({
  state: {
    email:""
  },
  getters: {
  },
  //Le mutations sono pensabili come degli eventi nel sistema. Cambiando lo stato di VUE (e lo si cambia facendo qualsiasi cosa)
  //allora si attiva un evento.
  mutations: {
    //Funzione di login.
    login (state,email) {
      state.email = email;
      localStorage.setItem('email', email); //localStorage viene dall'import.
      alert('Logged in');
    },
    //Funzione di logout.
    logout(state){
      state.email ="";
      localStorage.removeItem('email');
      alert('Logged out');
    },
    //Funzione di inizializzazione dello storage.
    initialiseStore(state) {
      if(localStorage.getItem('email')){
        state.email = localStorage.getItem('email');
       }
    }
  },
  actions: {
  },
  modules: {
  }
})