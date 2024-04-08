
let https = "https://localhost:7086/api/Contacts";
let http = "http://localhost:5209/api/Contacts";



new Vue({
    el: '#my-app',
    data: {
        contacts: [],
        addModal: false,
        name: '',
        family: '',
        phone: '',
        email: '',
    },
    methods: {
        GetData() {
            axios.get(https)
                .then(response => {

                    // console.log(response.data);
                    this.contacts = response.data;
                    console.log(this.contacts);
                })
                .catch(error => {
                    console.log("ERROR : " + error)
                });
        },
        addNew() {
            let https = "https://localhost:7086/api/Contacts";

            axios.post(https, {
                name: this.name,
                family: this.family,
                phone: this.phone,
                email: this.email,
            })
                .then((response) => {
                    this.GetData();
                    this.addModal = false;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });


        }
    },
    mounted() {
        this.GetData();
    },

    computed: {
        isEmpty() {
            if (!this.name || !this.family || !this.email || !this.phone) {
                return true;
            }
            else {
                return false;
            }
        }
    }
});