const RefAssignmentApp = {
    /* Storing data */
    data() {
        return {
            referees: [],
            selectedReferee: null, 
            games: [],
        }
    },
    computed: {},
    methods: {
      /* Selecting data from a list */
      selectReferee(r) {
        if (r == this.selectedReferee) {
            return;
        }

        this.selectedReferee = r;
        this.games = [];      
        this.fetchGamesData(this.selectedReferee);
      },

      /* Choosing a game for the assignment */
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
    

    /* Fetching data from API */
    fetchGamesData(r) {
      console.log("Fetching games data for ", r);
      fetch('/api/refereeAssignment/?referee=' + r.referee_id)
      .then( response => response.json() )
      .then( (responseJson) => {
        console.log(responseJson);
        this.games = responseJson;
      })
      .catch( (err) => {
        console.error(err);
      })
    },
    
  },
  
  /* Loading data to the page */
  created() {
      this.fetchRefereesData();
  }
}

Vue.createApp(RefAssignmentApp).mount('#RefAssignmentApp');