package com.example.task_flow.model.dto;

import com.example.task_flow.enums.DemandStatus;
import com.example.task_flow.enums.TokenType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDemandDTO {
    private Long id;
    private LocalDate demandDate;
    private DemandStatus status;
    private TokenType type;
    private Long userId;
    private Long taskId;
}
