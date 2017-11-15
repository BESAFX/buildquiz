app.factory("CategoryService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/category/findAll").then(function (response) {
                    return response.data;
                });
            },
            findAllCombo: function () {
                return $http.get("/api/category/findAllCombo").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/category/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (category) {
                return $http.post("/api/category/create", category).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/category/delete/" + id);
            },
            update: function (category) {
                return $http.put("/api/category/update", category).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);