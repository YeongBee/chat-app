package com.ai.aiprj.domain.gemini.controller;

import com.ai.aiprj.domain.gemini.dto.RequestDTO;
import com.ai.aiprj.domain.gemini.entity.ChatEntity;
import com.ai.aiprj.domain.gemini.service.ChatService;
import com.ai.aiprj.domain.gemini.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Request;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final GeminiService geminiService;
    private final ChatService chatService;

    @PostMapping("/test/gemini")
    public ResponseEntity<?> geminiTest(@RequestBody RequestDTO request) {

        try {
            RequestDTO response = geminiService.RequestAnswer(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error processing request", e);
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PostMapping("/test/gemini/stream")
    public ResponseEntity<Flux<String>> geminiStreamTest(@RequestBody RequestDTO request) {
        try {
            Flux<String> responseStream = geminiService.RequestAnswerStream(request);
            return ResponseEntity.ok()
                    .header("Content-Type", "text/plain; charset=utf-8")
                    .body(responseStream);
        } catch (Exception e) {
            log.error("Error processing stream request", e);
            return ResponseEntity.status(500)
                    .body(Flux.just("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/api/chat/history/{userId}")
    public List<ChatEntity> userHistory(@PathVariable("userId") String userId) {
        try {
            return chatService.getChats(userId);
        } catch (Exception e) {
            log.error("채팅 목록 불러오기 실패: {}", userId, e);
            throw new RuntimeException("채팅 목록 불러오기 실패", e);
        }
    }

    @GetMapping("/api/chat/history/{userId}/delete")
    public List<ChatEntity> userHistoryDelete(@PathVariable("userId") String userId) {
        try {
            List<ChatEntity> chats = chatService.getChats(userId);
            if (chats != null && !chats.isEmpty()) {
                chatService.deleteUserHistory(userId);
            }
            return chats;
        } catch (Exception e) {
            log.error("채팅 목록 삭제 실패: {}", userId, e);
            throw new RuntimeException("채팅 목록 삭제 실패", e);
        }
    }
}
