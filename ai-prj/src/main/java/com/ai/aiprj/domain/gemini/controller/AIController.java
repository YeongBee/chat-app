package com.ai.aiprj.domain.gemini.controller;

import com.ai.aiprj.domain.openai.dto.RequestDTO;
import com.ai.aiprj.domain.gemini.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final GeminiService geminiService;

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
}
