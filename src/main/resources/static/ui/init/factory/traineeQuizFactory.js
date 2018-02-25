app.factory("TraineeQuizService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/traineeQuiz/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/traineeQuiz/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            findByTrainee: function (trainee) {
                return $http.get("/api/traineeQuiz/findByTrainee/" + trainee.id).then(function (response) {
                    return response.data;
                });
            },
            findByPerson: function (person) {
                return $http.get("/api/traineeQuiz/findByPerson/" + person.id).then(function (response) {
                    return response.data;
                });
            },
            create: function (traineeQuiz) {
                return $http.post("/api/traineeQuiz/create", traineeQuiz).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/traineeQuiz/delete/" + id);
            },
            removeByTrainee: function (id) {
                return $http.delete("/api/traineeQuiz/deleteByTrainee/" + id);
            },
            update: function (traineeQuiz) {
                return $http.put("/api/traineeQuiz/update", traineeQuiz).then(function (response) {
                    return response.data;
                });
            },
            getTraineeQuizPercentage: function (traineeQuiz) {
                return $http.get("/api/traineeQuiz/getTraineeQuizPercentage/" + traineeQuiz.id).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);