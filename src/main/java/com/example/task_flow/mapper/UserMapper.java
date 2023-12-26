package com.example.task_flow.mapper;


import com.example.task_flow.model.dto.UserDTO;
import com.example.task_flow.model.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserDTO entityToDto(User user);
    User dtoToEntity(UserDTO userDTO);
}
