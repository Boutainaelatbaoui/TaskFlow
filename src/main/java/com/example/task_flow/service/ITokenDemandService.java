package com.example.task_flow.service;

import com.example.task_flow.model.dto.TokenDemandDTO;
import com.example.task_flow.model.dto.response.TokenDemandResponseDTO;

public interface ITokenDemandService {
    TokenDemandResponseDTO requestToken(TokenDemandDTO tokenDemandDTO);
}
