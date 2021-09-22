const app = { //const is faster, is not going to change
    data() {
      return { //initializing randomPerson object with default data in case randomUser API is down
        "randomPerson":{
            "firstName":"Brice",
            "lastName":"Wyne",
            "email":"bwyne@bwyne.com",
            "age":"42",
            "dateOfBirth":"10-18-1978",
            "country":"USA",
            "birthday":"",
        },
        "imgURL":"img/Batman.jpg"
    }
    },

    computed: { //we need to do some extra manipulation on the data
        prettyBirthday()
        {
            return dayjs(this.randomPerson.dateOfBirth).format('D MMM YYYY');
        }
    },

    methods: {
        fetchUserData()
        {
            fetch('https://randomuser.me/api/')
            .then(response => response.json()) 
            
            .then(responseJSON => {
                var fetchedUserDetails = responseJSON.results[0];
                this.randomPerson.firstName=fetchedUserDetails.name.first;
                this.randomPerson.lastName=fetchedUserDetails.name.last;
                this.randomPerson.email=fetchedUserDetails.email;
                this.randomPerson.age=fetchedUserDetails.dob.age;
                this.randomPerson.dateOfBirth=fetchedUserDetails.dob.date;
                this.randomPerson.country=fetchedUserDetails.location.country;
                this.imgURL=fetchedUserDetails.picture.large;
                console.log(this.randomPerson);
                console.log(this.randomPerson.image_URL_medium);
            }) //anon function, can use multiple statements

            .catch((err) => {
                console.error(err);
            })

        }
    },

    created() //event hook
    {
        this.fetchUserData();
    }
  }
  console.log("Creating and Mounting Vue Application");
  Vue.createApp(app).mount('#VueApp_InfoDisplay'); 