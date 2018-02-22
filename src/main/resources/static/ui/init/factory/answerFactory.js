app.factory("AnswerService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/answer/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/answer/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            findByQuestion: function (question) {
                return $http.get("/api/answer/findByQuestion/" + question.id).then(function (response) {
                    return response.data;
                });
            },
            create: function (answer) {
                return $http.post("/api/answer/create", answer).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/answer/delete/" + id);
            },
            removeByQuestion: function (id) {
                return $http.delete("/api/answer/deleteByQuestion/" + id);
            },
            update: function (answer) {
                return $http.put("/api/answer/update", answer).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);