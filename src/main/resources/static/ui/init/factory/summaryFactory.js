app.factory("SummaryService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/summary/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/summary/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (summary) {
                return $http.post("/api/summary/create", summary).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/summary/delete/" + id);
            },
            update: function (summary) {
                return $http.put("/api/summary/update", summary).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);