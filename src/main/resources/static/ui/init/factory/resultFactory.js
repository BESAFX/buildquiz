app.factory("ResultService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/result/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/result/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (result) {
                return $http.post("/api/result/create", result).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/result/delete/" + id);
            }
        };
    }]);