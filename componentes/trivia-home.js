Vue.component("estructura-paises", {
    data:function(){
        return{
            arr: [],
        }
    },
    template: `
        <div class="container info-view">
            <div class="row justify-content-around">
                <article class="card col-md-3 mb-5 mt-5 me-3" v-for="item in arr">
                    <img :src="item.flags.svg" alt="" class="img-fluid imgs-banderas mb-3" >
                    <div class="card-content">
                        <template>
                            <h3 class="text-center">{{item.translations.spa.common}}</h3>
                        </template>
                        <p>
                            <b>Población:</b> {{item.population | number('0,0' , { thousandsSeparator: '.'})}}
                        </p>
                        <p v-for="capital in item.capital">
                            <b>Capital:</b> {{capital}}
                        </p>
                        <p>
                            <b>Región:</b> {{item.region}}
                        </p>
                    </div>
                </article>
            </div>
        </div>
        `,
    methods: {
        async fetchData() {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all');
                const data = await res.json();
                this.arr = data;
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted: function() {
        this.fetchData();

        let linkActive = document.querySelector('.router-link-exact-active');
        let footer = document.querySelector('.footer');

        if (linkActive.innerHTML === 'Inicio'){
            footer.className = 'footer p-0 m-0 mw-100';
        }

    }
})