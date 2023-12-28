package com.example.task_flow.model.dto.response;

import com.example.task_flow.enums.Priority;
import com.example.task_flow.enums.TaskStatus;
import com.example.task_flow.model.dto.TagDTO;
import com.example.task_flow.model.entities.Tag;
import com.example.task_flow.model.entities.TokenDemand;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private LocalDate startDate;
    private LocalDate dueDate;
    private Long createdByUserId;
    private Long assignedToUserId;
    private TaskStatus status;
    private List<TagDTO> tags;
    private List<TokenDemand> tokenDemands;
}
