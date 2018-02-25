package com.besafx.app.Async;

import com.besafx.app.entity.Answer;
import com.besafx.app.entity.Question;
import com.besafx.app.entity.TraineeQuiz;
import com.besafx.app.entity.entity.QuestionResult;
import com.besafx.app.service.ResultService;
import org.decimal4j.util.DoubleRounder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionalService {

    private final static Logger log = LoggerFactory.getLogger(TransactionalService.class);

    @Autowired
    private ResultService resultService;

    @Transactional
    public QuestionResult getQuestionResult(TraineeQuiz traineeQuiz, Question question) {
        QuestionResult result;
        try {
            List<Long> userAnswers = resultService
                    .findByAnswerInAndTraineeQuiz(question.getAnswers(), traineeQuiz)
                    .stream()
                    .map(value -> value.getAnswer().getId())
                    .collect(Collectors.toList());
            if (userAnswers.isEmpty()) {
                log.info("REPRESENT THAT THIS QUESTION IS NOT ANSWERED YET");
                result = QuestionResult.NO_Answer;
                return result;
            }
            List<Long> rightAnswers = question.getAnswers()
                    .stream()
                    .filter(Answer::getIsAnswer)
                    .map(answer -> answer.getId())
                    .collect(Collectors.toList());
            result = new HashSet<>(userAnswers).equals(new HashSet<>(rightAnswers)) ? QuestionResult.Right_Answer : QuestionResult.Wrong_Answer;
        } catch (Exception ex) {
            result = QuestionResult.NO_Answer;
        }
        return result;
    }

    public Double getTraineeQuizPercentage(TraineeQuiz traineeQuiz) {
        try {
            double allQuestionsSize = traineeQuiz.getQuiz().getQuestions().size();
            if (allQuestionsSize == 0) return null;
            double rightQuestionSize = (double) traineeQuiz.getQuiz().getQuestions().stream().filter(question -> getQuestionResult(traineeQuiz, question).equals(QuestionResult.Right_Answer)).count();
            double result = (rightQuestionSize / allQuestionsSize) * 100;
            return DoubleRounder.round(result, 2);
        } catch (Exception ex) {
            return null;
        }
    }
}
