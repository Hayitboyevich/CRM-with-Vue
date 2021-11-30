import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filter/dateFilter'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';


Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: "AIzaSyCkvS0dB3W6gVO43T2eLQmIDZtLH0Kq0Yg",
  authDomain: "vue-crm-87a69.firebaseapp.com",
  projectId: "vue-crm-87a69",
  storageBucket: "vue-crm-87a69.appspot.com",
  messagingSenderId: "488621913923",
  appId: "1:488621913923:web:285e759f3c46e94ded61f6",
  measurementId: "G-999SF7LYKM"
};

let app

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(()=>{
  if(!app)
  {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

 



