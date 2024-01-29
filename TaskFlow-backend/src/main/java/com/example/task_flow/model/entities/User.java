package com.example.task_flow.model.entities;

import com.example.task_flow.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Builder
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    private String email;

    private String password;

    private String telephone;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "createdBy")
    private List<Task> createdTasks;

    @JsonIgnore
    @OneToMany(mappedBy = "assignedTo")
    private List<Task> assignedTasks;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TokenDemand> tokenDemands;

    @Column(name = "additional_tokens")
    private int additionalTokens;

}

