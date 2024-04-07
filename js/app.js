
let https = "https://localhost:7086/api/Contacts";
let http = "http://localhost:5209/api/Contacts";



new Vue({
    el: '#my-app',
    data: {
        contacts: [],
    },
    methods: {
        GetData() {
            axios.get(https)
                .then(response => {

                    // console.log(response.data);
                    this.contacts = response.data;
                    console.log(contacts);
                })
                .catch(error => {
                    console.log("ERROR : " + error)
                });
        }
    },
    mounted() {
        this.GetData();
    },
});