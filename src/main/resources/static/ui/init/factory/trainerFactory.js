app.factory("TrainerService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/trainer/findAll").then(function (response) {
                    return response.data;
                });
            },
            findAllCombo: function () {
                return $http.get("/api/trainer/findAllCombo").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/trainer/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (trainer) {
                return $http.post("/api/trainer/create", trainer).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/trainer/delete/" + id);
            },
            update: function (trainer) {
                return $http.put("/api/trainer/update", trainer).then(function (response) {
                    return response.data;
                });
            },
            enable: function (trainer) {
                return $http.get("/api/trainer/enable/" + trainer.id).then(function (response) {
                    return response.data;
                });
            },
            disable: function (trainer) {
                return $http.get("/api/trainer/disable/" + trainer.id).then(function (response) {
                    return response.data;
                });
            },
            filter: function (search) {
                return $http.get("/api/trainer/filter?" + search).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);