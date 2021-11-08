const reportUnassignedApp = {
    /* Storing data */
    data() {
        return {
            games: [],
            gameForm: {}
        }
    },
    computed: {},
    methods: {    
        /* Fetching games data */
        fetchGamesData() {
            fetch('/api/reportUnassigned/game.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        
        /* Post new data */
        postNewGamet(evt) {
            fetch('api/assignment/create.php', {
            method:'POST',
            body: JSON.stringify(this.gameForm),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
            })
            .then( response => response.json() )
            .then( json => {
            console.log("Returned from post:", json);
            this.games = json;
            });
        },

    },
    
    /* Loading data to the page */
    created() {
        this.fetchGamesData();
    }
  }
  
Vue.createApp(reportUnassignedApp).mount('#reportUnassignedApp');