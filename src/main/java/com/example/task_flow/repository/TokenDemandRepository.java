package com.example.task_flow.repository;

import com.example.task_flow.model.entities.TokenDemand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenDemandRepository extends JpaRepository<TokenDemand, Long> {
}
