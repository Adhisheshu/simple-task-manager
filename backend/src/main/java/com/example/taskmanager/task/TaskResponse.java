package com.example.taskmanager.task;

import java.time.Instant;

public record TaskResponse(
        Long id,
        String title,
        String description,
        Instant createdAt
) {}
