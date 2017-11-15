app.factory("QuizService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/quiz/findAll").then(function (response) {
                    return response.data;
                });
            },
            findAllCombo: function () {
                return $http.get("/api/quiz/findAllCombo").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/quiz/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (quiz) {
                return $http.post("/api/quiz/create", quiz).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/quiz/delete/" + id);
            },
            update: function (quiz) {
                return $http.put("/api/quiz/update", quiz).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);