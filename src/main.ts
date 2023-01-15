import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

//  router is passed to the Vue instance
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
