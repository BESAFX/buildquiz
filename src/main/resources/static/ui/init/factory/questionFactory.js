app.factory("QuestionService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/question/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/question/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            findByQuiz: function (quiz) {
                return $http.get("/api/question/findByQuiz/" + quiz.id).then(function (response) {
                    return response.data;
                });
            },
            create: function (question) {
                return $http.post("/api/question/create", question).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/question/delete/" + id);
            },
            update: function (question) {
                return $http.put("/api/question/update", question).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);