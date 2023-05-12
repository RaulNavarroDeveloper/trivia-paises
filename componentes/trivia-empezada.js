Vue.component("trivia-empezada", {
    data:function () {
        return {
            a:0,
            b:1,
            seleccion: false,
            puntuacion: 0,
            quiz:true,
            mostrar_puntuacion:false,
            siguiente:false,
            progreso:0,
            paises: [],
            arrayOpciones: [],
            loader: false,

        }
    },
    template:`
        <div class="container-app">
            <div class="container-quiz">
                <div class="quiz-cabecera">
                    <h1>Quiz Capitales</h1>
                </div>
                <div class="progreso" :style="{'width': progreso + '%'}"></div>

                <trivia-loader class="mt-5 pt-5" v-if="loader"></trivia-loader>

                <div class="quiz-main" v-for="(x, index) in armarPreguntas.slice(a,b)" :key="index" v-show="quiz">
                    <div class="box-preguntas">
                        <h2>Pregunta: {{b}}/{{armarPreguntas.length}}</h2>
                        <p>{{x.pregunta}}</p>
                    </div>
                    <div class="box-respuestas">
                        <ul>
                            <li v-for="(item, index) in x.opciones" :class="seleccion ? evaluar(item) : ''" @click="seleccionarRespuesta(item)" :key="index">{{item.opcion}}<i class="fa-solid fa-check ms-2" v-if="seleccion ? item.correct : ''"></i><i class="fa-solid fa-xmark ms-2" v-if="seleccion ? !item.correct : ''"></i></li>
                        </ul>
                    </div>
                </div>

                <div class="box-puntuacion" v-if="mostrar_puntuacion">
                    <h2>Tu puntaje es: {{puntuacion}}/{{armarPreguntas.length * 10}}</h2>
                        <div>
                            <p v-if="puntuacion <= 20">Podrías hacerlo mejor</p>
                            <p v-else-if="puntuacion >= 30 && puntuacion < 50 ">Nada mal, eres parte del promedio</p>
                            <p v-else-if="puntuacion == 50">¡Muy bien Hecho!</p>
                            <p v-else-if="puntuacion >= 60 && puntuacion <= 80">¡Genial!</p>
                            <p v-else-if="puntuacion >= 90 && puntuacion < 100">Te faltó solo 1!!</p>
                            <p v-else-if="puntuacion == 100">Hiciste todo Bien!!</p>
                        </div>
                        <trivia-form v-bind:puntuacion="this.puntuacion"></trivia-form>
                    <div class="btn-reiniciar">
                        <a class="btn btn-primary m-0" @click="reiniciarQuiz">Reiniciar <i class="fa-solid fa-rotate-right"></i></a>
                    </div>
                </div>

                <div class="quiz-footer" v-if="!loader" v-show="quiz">
                    <div class="box-botones" v-if="progreso < 100">
                        <button @click="omitirPregunta" :style="!siguiente ? 'background-color:rgb(106, 128, 202)' : ''">Saltar</button>
                        <button @click="siguientePregunta" :style="siguiente ? 'background-color:rgb(106, 128, 202)' : ''">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    computed: {
        numeroRandom:function(){
            let randomIndex = Math.floor(Math.random() * this.arrayOpciones.length);
            return randomIndex;
        },
        arrayPreguntasCortado:function(){
                return this.Mezclador(this.paises).slice(0, 10);
        },
        armarPreguntas:function(){
            let arrayPreguntas = [];
            for(let objeto of this.arrayPreguntasCortado){
                if(objeto.capital != undefined){
                    let objDinamico = {
                        pregunta: `Cual es la capital de ${objeto.translations.spa.common}?`,
                        respuesta: `${objeto.capital}`,
                        opciones: [
                            {opcion: `${objeto.capital}`, correct: true},
                            {opcion: `${this.armarOpciones(this.numeroRandom).opcion}`},
                            {opcion: `${this.armarOpciones(this.numeroRandom).opcion}`},
                            {opcion: `${this.armarOpciones(this.numeroRandom).opcion}`},
                        ]
                    }
                    objDinamico.opciones = this.Mezclador(objDinamico.opciones);
                    arrayPreguntas.push(objDinamico);
                } 
            };
            return arrayPreguntas;
        },
    },
    methods: {
        async fetchData() {
            this.loader = true;
            try {
                const res = await fetch('https://restcountries.com/v3.1/all');
                const data = await res.json();
                this.paises = data;
                this.loader = false;
            } catch (error) {
                console.log(error);
                this.loader = false;
            }
        },
        armarOpciones:function(numRandom){
            let arrayOpciones = [];
                for(let opcion of this.paises){
                    if(opcion.capital != undefined){
                        let objOpciones = {
                            opcion: `${opcion.capital}`
                        }
                        arrayOpciones.push(objOpciones);
                    }
                }
            this.arrayOpciones = arrayOpciones;
            return this.arrayOpciones[numRandom];
        },
        Mezclador:function(arr){
            let mezclado = arr
            .map(valor => ({valor, sort: Math.random()}))
            .sort((a,b) => a.sort - b.sort)
            .map(({valor}) => valor)
        return mezclado;
        },
        // evitarDuplicados:function(numRandom){
        //     let removidos = [];
        //     while(this.arrayOpciones.length > 0){
        //         let remover = this.arrayOpciones.splice(numRandom, 1);
        //         removidos.push(remover);
        //     }
        //     console.log(remover, this.arrayOpciones);
        // },
        seleccionarRespuesta:function(e){
            this.siguiente = true;

            this.seleccion = true;
            if(e.correct){
                this.puntuacion += 10;
            }
        },
        evaluar:function(status){
            if(status.correct) {
                return 'correcto';
            }
        return 'incorrecto';
        },
        siguientePregunta:function(){
            if(!this.siguiente){
                return;
            }
            this.progreso += (100/this.armarPreguntas.length);

            if(this.armarPreguntas.length - 1 == this.a){
                this.mostrar_puntuacion = true;
                this.quiz = false;
            } else{
                this.a++;
                this.b++;
                this.seleccion = false;
                this.siguiente = false;
            }
        },
        omitirPregunta:function(){
            if(this.siguiente){
                return;
            }

            this.progreso += (100/this.armarPreguntas.length);

            if(this.armarPreguntas.length - 1 == this.a){
                this.mostrar_puntuacion = true;
                this.quiz = false;
            } else{
                this.a++;
                this.b++;
                this.seleccion = false;
            }
        },
        reiniciarQuiz:function(){
            Object.assign(this.$data, this.$options.data());
            this.fetchData();

        },
        prueba:function(){
        }
    },
    mounted: function() {
        this.fetchData();
        let linkActive = document.querySelector('.router-link-exact-active');
        let footer = document.querySelector('.footer');

        if (linkActive.innerHTML === 'Trivia Empezada'){
            footer.className = 'footer p-0 m-0 mw-100';
        }
    },
    created: function(){
    }
    })

    // Un componente horarios  [ [], [] ]
    //Contiene dos componentes horario []
    //
    //El objetivo es agregar en la base un rango horario