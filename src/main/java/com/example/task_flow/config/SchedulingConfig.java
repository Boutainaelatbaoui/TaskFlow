package com.example.task_flow.config;

import com.example.task_flow.service.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class SchedulingConfig {
    private final ITaskService taskService;

    @Autowired
    public  SchedulingConfig(ITaskService taskService){
        this.taskService = taskService;
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void updateOverdueTasks() {
        taskService.updateOverdueTasksStatus();
    }
}
