const reportDateRangeApp = {
    /* Storing data */
    data() {
        return {
            games: [],
            gameForm: {},
            referees: []
        }
    },
    computed: {},
    methods: {    
        /* Fetching games data */
        fetchGamesData() {
            fetch('/api/game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
      
        /* Fetching referee data */
        fetchRefereesData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
            console.log(responseJson);
            this.referees = responseJson;
            })
            .catch( (err) => {
            console.error(err);
            })
        },
        
        /* Post new data */
        postNewAssignment(evt) {
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
        this.fetchRefereesData();
    }
  }
  
Vue.createApp(reportDateRangeApp).mount('#reportDateRangeApp');