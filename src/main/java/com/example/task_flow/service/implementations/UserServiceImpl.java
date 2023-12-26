package com.example.task_flow.service.implementations;

// UserServiceImpl.java
import com.example.task_flow.mapper.UserMapper;
import com.example.task_flow.model.dto.UserDTO;
import com.example.task_flow.model.entities.User;
import com.example.task_flow.repository.UserRepository;
import com.example.task_flow.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public User createUser(UserDTO userDTO) {
        User user = userMapper.dtoToEntity(userDTO);
        System.out.println(user);
        User savedUser = userRepository.save(user);
        System.out.println(savedUser);
        return savedUser;
    }
}

