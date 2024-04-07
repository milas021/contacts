
new Vue({
    el: "#new-app",
    data: {
        name: '',
        family: '',
        phone: '',
        email: '',
    },
    methods: {

        addNew: function () {
            let https = "https://localhost:7086/api/Contacts";

            axios.post(https, {
                name: this.name,
                family: this.family ,
                phone: this.phone ,
                email: this.email ,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    },
});