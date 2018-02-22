app.factory("TraineeService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/trainee/findAll").then(function (response) {
                    return response.data;
                });
            },
            findAllCombo: function () {
                return $http.get("/api/trainee/findAllCombo").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/trainee/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (trainee) {
                return $http.post("/api/trainee/create", trainee).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/trainee/delete/" + id);
            },
            update: function (trainee) {
                return $http.put("/api/trainee/update", trainee).then(function (response) {
                    return response.data;
                });
            },
            enable: function (trainee) {
                return $http.get("/api/trainee/enable/" + trainee.id).then(function (response) {
                    return response.data;
                });
            },
            disable: function (trainee) {
                return $http.get("/api/trainee/disable/" + trainee.id).then(function (response) {
                    return response.data;
                });
            },
            filter: function (search) {
                return $http.get("/api/trainee/filter?" + search).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);