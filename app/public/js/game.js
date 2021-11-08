const GameApp = {
    /* Storing data */
    data() {
        return {
            games: [],
            gameForm: {},
            selectedGame: null
        }
    },
    computed: {},
    methods: {    
      /* Fetching data from API */
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
      
      /* Function to check if data is being added or edited */
      postGame(evt){
        console.log ("Test:", this.selectedGame);
        if (this.selectedGame) {
            this.postEditGame(evt);
        } else {
            this.postNewGame(evt);
        }
      },
      
      /* Post new data */
      postNewGame(evt) {
        fetch('api/game/create.php', {
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
          this.handleResetEdit();
        });
      },
        
      /* Editing data prompt */
      handleEditGame(game) {
        this.selectedGame = game;
        this.gameForm = Object.assign({}, this.selectedGame);
      },
      
      /* Reset data prompt */
      handleResetEdit() {
        this.selectedGame = null;
        this.gameForm = {};
      },

      /* Posting edited data */
      postEditGame(evt) {
        this.gameForm.id = this.selectedGame.id;
    
        console.log("Editing!", this.gameForm);
    
        fetch('api/game/update.php', {
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
          this.handleResetEdit();
        });
      },
  
      /* Deleting data information */
      postDeleteGame(game) {
        if (!confirm("Are you sure you want to delete the selected game?")) {
          return;
        }
    
        console.log("Delete!", game);
    
        fetch('api/game/delete.php', {
          method: 'POST',
          body: JSON.stringify(game),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);   
          this.games = json;
          this.handleResetEdit();
        });
      }
    },
    
    /* Loading data to the page */
    created() {
        this.fetchGamesData();
    }
  }
  
Vue.createApp(GameApp).mount('#GameApp');