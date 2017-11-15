app.factory("PersonService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/person/findAll").then(function (response) {
                    return response.data;
                });
            },
            findAllCombo: function () {
                return $http.get("/api/person/findAllCombo").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/person/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (person) {
                return $http.post("/api/person/create", person).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/person/delete/" + id);
            },
            update: function (person) {
                return $http.put("/api/person/update", person).then(function (response) {
                    return response.data;
                });
            },
            setGUILang: function (lang) {
                return $http.get("/api/person/setGUILang/" + lang).then(function (response) {
                    return response.data;
                });
            },
            setDateType: function (dateType) {
                return $http.get("/api/person/setDateType/" + dateType).then(function (response) {
                    return response.data;
                });
            },
            enable: function (person) {
                return $http.get("/api/person/enable/" + person.id).then(function (response) {
                    return response.data;
                });
            },
            disable: function (person) {
                return $http.get("/api/person/disable/" + person.id).then(function (response) {
                    return response.data;
                });
            },
            findActivePerson: function () {
                return $http.get("/api/person/findActivePerson").then(function (response) {
                    return response.data;
                });
            }
        };
    }]);