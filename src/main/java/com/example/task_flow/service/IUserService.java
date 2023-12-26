package com.example.task_flow.service;

import com.example.task_flow.model.dto.UserDTO;
import com.example.task_flow.model.dto.response.UserResponseDTO;
import com.example.task_flow.model.entities.User;

public interface IUserService {
    UserResponseDTO createUser(UserDTO userDTO);
}
