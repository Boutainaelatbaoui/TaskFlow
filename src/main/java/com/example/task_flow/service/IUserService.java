package com.example.task_flow.service;

import com.example.task_flow.model.dto.UserDTO;
import com.example.task_flow.model.entities.User;

public interface IUserService {
    User createUser(UserDTO userDTO);
}
