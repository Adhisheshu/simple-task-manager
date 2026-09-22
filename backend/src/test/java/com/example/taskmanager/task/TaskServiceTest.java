package com.example.taskmanager.task;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {
    @Test
    void requestShouldKeepTitleAndDescription() {
        TaskRequest request = new TaskRequest("  Build API  ", "  Add validation  ");
        assertEquals("  Build API  ", request.title());
        assertEquals("  Add validation  ", request.description());
    }
}
