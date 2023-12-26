package com.example.task_flow.model.dto;

import com.example.task_flow.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String userName;
    private String email;
    private String password;
    private String telephone;
    private Role role;
}


