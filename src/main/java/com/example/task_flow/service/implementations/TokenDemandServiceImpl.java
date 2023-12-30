package com.example.task_flow.service.implementations;

import com.example.task_flow.mapper.TokenDemandMapper;
import com.example.task_flow.model.dto.TokenDemandDTO;
import com.example.task_flow.model.dto.response.TokenDemandResponseDTO;
import com.example.task_flow.model.entities.TokenDemand;
import com.example.task_flow.repository.TokenDemandRepository;
import com.example.task_flow.service.ITokenDemandService;
import com.example.task_flow.service.TokenDemandService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenDemandServiceImpl implements ITokenDemandService {

    private final TokenDemandRepository tokenDemandRepository;
    private final TokenDemandMapper tokenDemandMapper;

    @Override
    public TokenDemandResponseDTO requestToken(TokenDemandDTO tokenDemandDTO) {
        // Implement your logic for token request, considering the constraints mentioned
        // ...

        TokenDemand tokenDemand = tokenDemandMapper.dtoToEntity(tokenDemandDTO);
        TokenDemand savedTokenDemand = tokenDemandRepository.save(tokenDemand);

        return tokenDemandMapper.entityToDto(savedTokenDemand);
    }

    // Add other service methods as needed
}
