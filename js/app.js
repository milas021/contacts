new Vue({
    el: '#my-app',
    data: {
        // Static data
        baseAddress: "https://localhost:7086/api/Contacts",
        // Array
        contacts: [],
        // Boolean
        addModal: false,
        editModal: false,
        confirmModal: false,
        showOverlay: false,
        snackbar: false,
        // String
        id: '',
        name: '',
        family: '',
        phone: '',
        email: '',
        message: '',
        page: 1,
        pageSize: 5,
        pageCount: 0,
    },
    methods: {
        GetData(page, pageSize) {
            console.log('XX');
            this.page = page;
            let address = this.baseAddress + '?page=' + page + '&pageSize=' + pageSize;
            axios.get(address)
                .then(response => {
                    this.contacts = response.data.contacts;
                    this.pageCount = Math.ceil(response.data.totalRecord / this.pageSize);
                    console.log(this.pageCount);
                })
                .catch(error => {
                    console.log("ERROR : " + error)
                });
        },
        addNew() {
            axios.post(this.baseAddress, {
                name: this.name,
                family: this.family,
                phone: this.phone,
                email: this.email,
            })
                .then((response) => {
                    this.GetData(this.page, this.pageSize);
                    this.addModal = false;
                    this.showOverlay = false;
                    this.message = response.data;
                    this.snackbar = true;
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
            setTimeout(() => {
                document.querySelector(".confirm-modal").focus();
            }, 100);
        },

        editContact() {
            let body = {
                id: this.id,
                name: this.name,
                family: this.family,
                email: this.email,
                phone: this.phone,
            }

            axios.put(this.baseAddress, body)
                .then(response => {
                    this.GetData();
                    this.editModal = false;
                    this.showOverlay = false;
                    this.message = response.data;
                    this.snackbar = true;
                })
                .catch(error => {
                    console.log('Error: ' + error);
                });

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
                    this.id = contacts.id;
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
                    this.message = response.data
                    this.snackbar = true;
                })
                .catch(error => {
                    console.error(error);
                });
        }
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

    },

    watch: {
        snackbar(val, oldVal) {
            if (val) {
                setTimeout(() => {
                    this.snackbar = false
                }, 3000);
            }
        },
    },

    mounted() {
        this.GetData(this.page, this.pageSize);
    },
});