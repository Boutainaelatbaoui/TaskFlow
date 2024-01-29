package com.example.task_flow.model.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagDTO {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
}
