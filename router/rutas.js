const home = { template: `<estructura-paises></estructura-paises>`, name:"inicio"};
const trivia = {template: `<trivia-component></trivia-component>`, name:"trivia"};
const started = {template: `<trivia-empezada></trivia-empezada>`, name:"started"};
const clasificacion = {template: `<trivia-clasificacion></trivia-clasificacion>`, name:"clasificacion"};


const routes = [
    { path: '/', component: home },
    { path: '/trivia', component: trivia },
    { path: '/trivia-empezada', component: started },
    { path: '/trivia-clasificacion', component: clasificacion},
    {path:'*', redirect: '/'}
  ];

  const router = new VueRouter({routes});

  const app = new Vue({
	el:"#all",
  	router,
});