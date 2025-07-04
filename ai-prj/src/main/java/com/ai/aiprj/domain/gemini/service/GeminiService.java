package com.ai.aiprj.domain.gemini.service;

import com.ai.aiprj.domain.gemini.entity.ChatEntity;
import com.ai.aiprj.domain.gemini.repository.ChatRepository;
import com.ai.aiprj.domain.openai.dto.RequestDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;

import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.ChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.messages.MessageType;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final ChatClient chatClient;
    private final ChatMemoryRepository chatMemoryRepository;
    private final ChatRepository chatRepository;


    public RequestDTO RequestAnswer(RequestDTO request) {

        // Send the user request and get the response
       return chatClient.prompt()
               .system("""
                 너는 친구처럼 대화하는 한국어 AI 챗봇이야.
                 사용자의 질문에 답변해줘.
                 """)
               .user(request.getContent())
               .call()

               .entity(RequestDTO.class);
    }

    public Flux<String> RequestAnswerStream(RequestDTO request) {
        String userId = "user1234";

        ChatEntity userChat = ChatEntity.builder()
                .userId(userId)
                .messageType(MessageType.USER)
                .content(request.getContent())
                .build();

        ChatMemory chatMemory = MessageWindowChatMemory.builder()
                .maxMessages(10)
                .chatMemoryRepository(chatMemoryRepository)
                .build();
        chatMemory.add(userId, new UserMessage(request.getContent()));



        StringBuilder sb = new StringBuilder();

        return chatClient.prompt()
                .messages(chatMemory.get(userId))
//                .system("""
//                 너는 친구처럼 대화하는 한국어 AI 챗봇이야.
//                 사용자의 질문에 답변해줘.
//                 """)
                .user(request.getContent())
                .stream().content()
                .doOnNext(s -> sb.append(s))
                .doOnComplete( () -> {
                    ChatEntity assistant = ChatEntity.builder()
                            .userId(userId)
                            .content(sb.toString())
                            .messageType(MessageType.ASSISTANT)
                            .build();
                    chatRepository.saveAll(List.of(userChat, assistant));

                });
    }
}
