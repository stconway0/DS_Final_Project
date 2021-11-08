const AssignmentApp = {
    /* Storing data */
    data() {
        return {
            games: [],
            selectedGame: null,
            referees: [],
            assignments: [],
            assignmentForm: {},
            selectedAssignment: null
        }
    },
    computed: {},
    methods: {
      /* Selecting data from a list */
      selectGame(g) {
        if (g == this.selectedGame) {
            return;
        }

        this.selectedGame = g;
        this.assignments = [];      
        this.fetchAssignmentsData(this.selectedGame);
      },

      /* Choosing a game for the assignment */
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
    
    /* Fetching data from API */
    fetchAssignmentsData(g) {
      console.log("Fetching assignment data for ", g);
      fetch('/api/assignment/?game=' + g.game_id)
      .then( response => response.json() )
      .then( (responseJson) => {
        console.log(responseJson);
        this.assignments = responseJson;
      })
      .catch( (err) => {
        console.error(err);
      })
    },

    /* Function to check if data is being added or edited */
    postAssignment(evt){
      console.log ("Test:", this.selectedAssignment);
      if (this.selectedAssignment) {
          this.postEditAssignment(evt);
      } else {
          this.postNewAssignment(evt);
      }
    },
    
    /* Post new data */
    postNewAssignment(evt) {
      fetch('api/assignment/create.php', {
        method:'POST',
        body: JSON.stringify(this.assignmentForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from post:", json);
        this.assignments = json;
        this.handleResetEdit();
      });
    },
      
    /* Editing data prompt */
    handleEditAssignment(assignment) {
      this.selectedAssignment = assignment;
      this.assignmentForm = Object.assign({}, this.selectedAssignment);
    },
    
    /* Reset data prompt */
    handleResetEdit() {
      this.selectedAssignment = null;
      this.assignmentForm = {};
    },

    /* Posting edited data */
    postEditAssignment(evt) {
      this.assignmentForm.id = this.selectedAssignment.id;
  
      console.log("Editing!", this.assignmentForm);
  
      fetch('api/assignment/update.php', {
        method:'POST',
        body: JSON.stringify(this.assignmentForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from post:", json);
        this.assignments = json;
        this.handleResetEdit();
      });
    },

    /* Deleting data information */
    postDeleteAssignment(assignment) {
      if (!confirm("Are you sure you want to delete the selected assignment?")) {
        return;
      }
  
      console.log("Delete!", assignment);
  
      fetch('api/assignment/delete.php', {
        method: 'POST',
        body: JSON.stringify(assignment),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log("Returned from post:", json);   
        this.assignments = json;
        this.handleResetEdit();
      });
    }
  },
  
  /* Loading data to the page */
  created() {
      this.fetchGamesData();
      this.fetchRefereesData();
  }
}

Vue.createApp(AssignmentApp).mount('#AssignmentApp');