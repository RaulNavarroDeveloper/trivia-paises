Vue.component('trivia-form', {
    props: ["puntuacion"],
    data:function(){
        return {
            datos: {
                nombre: "",
                apellido: "",
                puntuacion: this.puntuacion,
            },
            arrayLocal: [],
        }
    },
    template: `
        <div>
            <h3>¿Quieres guardar tu puntaje?</h3>
            <form @submit.prevent="" class="d-flex flex-column align-items-center">
                <div class="div-input d-flex flex-column w-50 align-items-center mt-3">
                    <label for="nombre">Nombre</label>
                    <input class="mt-1" type="text" v-model="datos.nombre" name="nombre" placeholder="Ingresa tu nombre">
                </div>
                <div class="div-input d-flex flex-column w-50 align-items-center mt-3">
                    <label for="apellido">Apellido</label>
                    <input class="mt-1" type="text" v-model="datos.apellido" name="Apellido" placeholder="Ingresa tu apellido">
                </div>
                <a class="boton-form btn px-5 mt-3" @click="guardarDatos(datos)">Enviar</a>
            </form>
        </div>
    `,
    methods: {
        guardarDatos:function(dato){
            console.log(dato);
            if(!localStorage.clasificacion){
                this.arrayLocal = [];
            } else{
                this.arrayLocal = JSON.parse(localStorage.getItem("clasificacion"));
            }
            this.arrayLocal.push(dato);
            localStorage.setItem("clasificacion", JSON.stringify(this.arrayLocal));
            Object.assign(this.$data, this.$options.data);
            this.$router.push('/trivia-clasificacion');
        }
    },
    
})