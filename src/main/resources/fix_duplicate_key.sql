SELECT setval('answer_sequence', (SELECT MAX(id) FROM answer) + 1);
SELECT setval('attach_sequence', (SELECT MAX(id) FROM attach) + 1);
SELECT setval('category_sequence', (SELECT MAX(id) FROM category) + 1);
SELECT setval('contact_sequence', (SELECT MAX(id) FROM contact) + 1);
SELECT setval('history_sequence', (SELECT MAX(id) FROM history) + 1);
SELECT setval('person_sequence', (SELECT MAX(id) FROM person) + 1);
SELECT setval('question_sequence', (SELECT MAX(id) FROM question) + 1);
SELECT setval('quiz_sequence', (SELECT MAX(id) FROM quiz) + 1);
SELECT setval('team_sequence', (SELECT MAX(id) FROM team) + 1);
SELECT setval('trainee_sequence', (SELECT MAX(id) FROM trainee) + 1);
SELECT setval('trainee_quiz_sequence', (SELECT MAX(id) FROM trainee_quiz) + 1);
SELECT setval('trainer_sequence', (SELECT MAX(id) FROM trainer) + 1);