package isil.java_quiz_server.repository;

import isil.java_quiz_server.modal.Quiz;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
	
	 public List<Quiz> findAll();
	 public Quiz save(Quiz quiz);
	 public Quiz findbyId();
}
