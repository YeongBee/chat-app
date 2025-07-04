package com.ai.aiprj.domain.gemini.repository;

import com.ai.aiprj.domain.gemini.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Long> {


    List<ChatEntity> findByUserIdOrderByCreatedAtAsc(String userId);
    void deleteAllByUserId(String userId);
}
