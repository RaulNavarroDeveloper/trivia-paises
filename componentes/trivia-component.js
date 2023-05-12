Vue.component('trivia-component', {
data:function () {
    return {

    }
},
template:`
    <section class="trivia d-flex flex-column align-items-center mt-5">
        <h1>¿Estás listo para probar tus conocimientos sobre Geografía?</h1>
        <p>En este quiz encontrarás diversas preguntas sobre paises, desde conocimientos de banderas, capitales y ciudades, ¡Anímate a probarlo!</p>
        <a class="btn btn-quiz px-5 py-3 fw-bold fs-4 rounded-pill mt-4" v-on:click="redireccion()">Comenzar Quiz</a>
    </section>
`,
methods: {
    redireccion:function () {
        this.$router.push("/trivia-empezada")
    }
},
mounted:function() {
    let linkActive = document.querySelector('.router-link-exact-active');
    let footer = document.querySelector('.footer');

    if(linkActive.innerHTML === 'Trivia'){
        footer.className += ' fixed-bottom';
    } 
}
});
