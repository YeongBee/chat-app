package com.ai.aiprj.domain.gemini.service;

import com.ai.aiprj.domain.gemini.entity.ChatEntity;
import com.ai.aiprj.domain.gemini.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    @Transactional(readOnly = true)
    public List<ChatEntity> getChats(String userId) {
        return chatRepository.findByUserIdOrderByCreatedAtAsc(userId);
    }

    @Transactional
    public void deleteUserHistory(String userId) {
        chatRepository.deleteAllByUserId(userId);
    }
}
