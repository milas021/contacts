
let https = "https://localhost:7086/api/Contacts";
let http = "http://localhost:5209/api/Contacts";



new Vue({
    el: '#my-app',
    data: {
        https: "https://localhost:7086/api/Contacts",
        http : "http://localhost:5209/api/Contacts",
        contacts: [],
        addModal: false,
        editModal: false,
        showOverlay: false,
        confirmModal: false,
        name: '',
        family: '',
        phone: '',
        email: '',
        id: '',
        baseAddress: "https://localhost:7086/api/Contacts"
    },
    methods: {
        GetData() {
            axios.get(https)
                .then(response => {
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
                    this.showOverlay = false;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });


        },
        overlayClicked() {

            this.showOverlay = false;
            this.addModal = false;
            this.editModal = false;
            this.confirmModal = false;

        },
        delteIconClicked(id) {
            this.showOverlay = true;
            this.confirmModal = true;

            this.id = id;

        },
        editContact() {

        },
        showContact(id) {
            this.editModal = true;
            this.showOverlay = true;

            let Address = this.baseAddress + "/" + id;

            axios.get(Address)
                .then(response => {

                    let contacts = response.data;

                    this.name = contacts.name;
                    this.family = contacts.family;
                    this.phone = contacts.phone;
                    this.email = contacts.email;
                })
                .catch(error => {
                    console.log("ERROR : " + error)
                });


        },
        addModalClicked() {
            this.showOverlay = true;
            this.addModal = true;

            this.name = '';
            this.family = '';
            this.phone = '';
            this.email = '';
        },

        deleteContact() {

            let Address = this.baseAddress + "?id=" + this.id;


            axios.delete(Address)
                .then(response => {
                    this.GetData();
                    this.confirmModal = false;
                    this.showOverlay = false;
                })
                .catch(error => {
                    console.error(error);
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