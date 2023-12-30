package com.example.task_flow.model.dto.response;

import com.example.task_flow.enums.DemandStatus;
import com.example.task_flow.enums.TokenType;
import com.example.task_flow.model.dto.TaskDTO;
import com.example.task_flow.model.dto.UserDTO;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDemandResponseDTO {
    private Long id;
    private LocalDate demandDate;
    private DemandStatus status;
    private TokenType type;
    private UserDTO user;
    private TaskDTO task;
}
