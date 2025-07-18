package com.ai.aiprj.domain.gemini.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemoryRepository;
import org.springframework.ai.chat.memory.repository.jdbc.JdbcChatMemoryRepository;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class AIConfig {


//    @Bean
//    public ChatMemoryRepository chatMemoryRepository(JdbcTemplate jdbcTemplate, PlatformTransactionManager transactionManager) {
//        return JdbcChatMemoryRepository.builder()
//                .jdbcTemplate(jdbcTemplate)
//                .transactionManager(transactionManager)
//                .build();
//    }

    @Bean
    public ChatClient chatClient(ChatModel chatModel) {
        return ChatClient.builder(chatModel).build();
    }
}
