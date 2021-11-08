const RefereeApp = {
    /* Storing data */
    data() {
        return {
            referees: [],
            refereeForm: {},
            selectedReferee: null
        }
    },
    computed: {},
    methods: {     
      /* Fetching data from API */
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
      
      /* Function to check if data is being added or edited */
      postReferee(evt){
        console.log ("Test:", this.selectedReferee);
        if (this.selectedReferee) {
            this.postEditReferee(evt);
        } else {
            this.postNewReferee(evt);
        }
      },
      
      /* Post new data */
      postNewReferee(evt) {
        fetch('api/referee/create.php', {
          method:'POST',
          body: JSON.stringify(this.refereeForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.referees = json;
          this.handleResetEdit();
        });
      },
        
      /* Editing data prompt */
      handleEditReferee(referee) {
        this.selectedReferee = referee;
        this.refereeForm = Object.assign({}, this.selectedReferee);
      },
      
      /* Reset data prompt */
      handleResetEdit() {
        this.selectedReferee = null;
        this.refereeForm = {};
      },

      /* Posting edited data */
      postEditReferee(evt) {
        this.refereeForm.id = this.selectedReferee.id;
    
        console.log("Editing!", this.refereeForm);
    
        fetch('api/referee/update.php', {
          method:'POST',
          body: JSON.stringify(this.refereeForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.referees = json;
          this.handleResetEdit();
        });
      },
  
      /* Deleting data information */
      postDeleteReferee(referee) {
        if (!confirm("Are you sure you want to delete the selected referee?")) {
          return;
        }
    
        console.log("Delete!", referee);
    
        fetch('api/referee/delete.php', {
          method: 'POST',
          body: JSON.stringify(referee),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);   
          this.referees = json;
          this.handleResetEdit();
        });
      }
    },
    
    /* Loading data to the page */
    created() {
        this.fetchRefereesData();
    }
  }
  
Vue.createApp(RefereeApp).mount('#RefereeApp');