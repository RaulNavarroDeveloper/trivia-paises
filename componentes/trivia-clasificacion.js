Vue.component("trivia-clasificacion", {
    data:function(){
        return {
            arrayLocalParsed: [],
            sinInfo: false,
        }
    },
    template:`
        <div>
        <template v-if="sinInfo">
            <h1 class="text-center mt-4">Oops! Al parecer no hay datos guardados</h1>
            <h2 class="text-center mt-3">Parece que aún nadie a guardado su puntaje, ¿Que esperas a ser el primero?</h2>
            <div class="d-flex justify-content-center mt-3">
            <a class=" ir-trivia btn px-5 py-2 mt-3" @click="redireccion">Jugar trivia</a>
            </div>
        </template>

        <h1 v-if="!sinInfo" class=" mt-4 text-center">Tabla de clasificación</h1>
            <table v-if="!sinInfo" class="table mt-5">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody v-for="item in arrayOrdenado">
                    <tr>
                            <td>{{item.nombre}}</td>
                            <td>{{item.apellido}}</td>
                            <td>{{item.puntuacion}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    mounted:function(){
    this.verLocalStorage();

    let linkActive = document.querySelector('.router-link-exact-active');
    let footer = document.querySelector('.footer');

        if (linkActive.innerHTML === 'Tabla de clasificación'){
            footer.className += ' fixed-bottom';
        }
    },
    computed: {
        arrayOrdenado:function(){
            return this.arrayLocalParsed.slice()
            .sort((a,b) => b.puntuacion - a.puntuacion)
            // if(a.puntuacion < b.puntuacion){
            //     return 1;
            // }
            // if(a.puntuacion > b.puntuacion){
            //     return -1;
            // }
        }
    },
    methods: {
        verLocalStorage:function(){
            if(localStorage.clasificacion){
                this.arrayLocalParsed = JSON.parse(localStorage.getItem("clasificacion"));
            } else{
                this.sinInfo = true;
            }
        },
        redireccion:function(){
            this.$router.push('/trivia');
        }
    }
})