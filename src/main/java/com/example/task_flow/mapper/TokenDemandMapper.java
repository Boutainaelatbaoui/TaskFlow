package com.example.task_flow.mapper;

import com.example.task_flow.model.dto.TokenDemandDTO;
import com.example.task_flow.model.dto.response.TokenDemandResponseDTO;
import com.example.task_flow.model.entities.TokenDemand;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TokenDemandMapper {
    TokenDemandMapper INSTANCE = Mappers.getMapper(TokenDemandMapper.class);
    TokenDemand dtoToEntity(TokenDemandDTO tokenDemandDTO);
    TokenDemandResponseDTO entityToDto(TokenDemand tokenDemand);
}
