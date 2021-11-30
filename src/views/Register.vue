<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
       <input 
        id="email"
         type="text" 
         v-model.trim="email"
         :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Поле Email не должно быть пустым</small>
         <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" 
          v-model.trim="password"
         :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"/>
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Поле Пароль не должно быть пустым</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль должно быть 6 символов. Сейчас он {{ password.length}}</small> 
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
      >
      <label for="name">Имя</label>
      <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Поле Имя не должно быть пустым</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />   
        <span :class="{invalid: ($v.agree.$dirty && !$v.agree.checked)}">С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <a href="/">Войти!</a>
    </p>
  </div>
</form>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators' 
export default {
  name: 'register',
  data:()=>({
    name: '',
    email: '',
    password: '',
    agree: false,
  }),

  validations:{
  name: {required},
  email:{email, required},
  password:{required, minLength:minLength(6)},
  agree:{checked: v =>v}
  },

  methods:{
   async submitHandler(){
     if(this.$v.$invalid){
          this.$v.$touch()
          return
      }

      const formData = {
        name:this.name,
        email:this.email,
        password:this.password,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {
        throw error
      }

    }
  }
}
</script>
