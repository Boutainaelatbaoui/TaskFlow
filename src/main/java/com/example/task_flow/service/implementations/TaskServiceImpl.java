package com.example.task_flow.service.implementations;

import com.example.task_flow.mapper.TaskMapper;
import com.example.task_flow.model.dto.TaskDTO;
import com.example.task_flow.model.dto.response.TaskResponseDTO;
import com.example.task_flow.model.entities.Tag;
import com.example.task_flow.model.entities.Task;
import com.example.task_flow.model.entities.User;
import com.example.task_flow.repository.TagRepository;
import com.example.task_flow.repository.TaskRepository;
import com.example.task_flow.repository.UserRepository;
import com.example.task_flow.service.ITaskService;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements ITaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;



    @Override
    public TaskResponseDTO createTask(TaskDTO taskDTO) {
        validateTaskDTO(taskDTO);

        Task task = taskMapper.dtoToEntity(taskDTO);
        task.setCreatedBy(getUserById(taskDTO.getCreatedByUserId()));
        task.setAssignedTo(getUserById(taskDTO.getAssignedToUserId()));
        task.setTags(getTagsByIds(taskDTO.getTagIds()));
        Task savedTask = taskRepository.save(task);
        return taskMapper.entityToDto(savedTask);
    }

    @Override
    public TaskResponseDTO updateTask(Long taskId, TaskDTO taskDTO) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            //validateTaskDTO(taskDTO);

            Task task = optionalTask.get();
            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setPriority(taskDTO.getPriority());
            task.setStartDate(taskDTO.getStartDate());
            task.setDueDate(taskDTO.getDueDate());
            task.setAssignedTo(getUserById(taskDTO.getAssignedToUserId()));
            task.setTags(getTagsByIds(taskDTO.getTagIds()));

            Task updatedTask = taskRepository.save(task);
            return taskMapper.entityToDto(updatedTask);
        } else {
            throw new ValidationException("Task not found with ID: " + taskId);
        }
    }

    @Override
    public void deleteTask(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            taskRepository.deleteById(taskId);
        } else {
            throw new ValidationException("Task not found with ID: " + taskId);
        }
    }

    @Override
    public TaskResponseDTO getTaskById(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            return taskMapper.entityToDto(task);
        } else {
            throw new ValidationException("Task not found with ID: " + taskId);
        }
    }

    @Override
    public List<TaskResponseDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(taskMapper::entityToDto)
                .collect(Collectors.toList());
    }

    private void validateTaskDTO(TaskDTO taskDTO) {
//        LocalDate currentDate = LocalDate.now();
//
//        if (taskDTO.getStartDate().isBefore(currentDate) || taskDTO.getDueDate().isBefore(currentDate)) {
//            throw new ValidationException("Task start and due dates cannot be in the past.");
//        }
//
//        if (taskDTO.getStartDate().isAfter(taskDTO.getDueDate().minusDays(3))) {
//            throw new ValidationException("Task must be scheduled at least 3 days in advance.");
//        }

        getTagsByIds(taskDTO.getTagIds());

        if (taskDTO.getTagIds().size() < 2) {
            throw new ValidationException("At least two tags are required for the task.");
        }

        getUserById(taskDTO.getCreatedByUserId());
        getUserById(taskDTO.getAssignedToUserId());
    }

    private List<Tag> getTagsByIds(List<Long> tagIds) {
        List<Tag> existingTags = tagRepository.findAllById(tagIds);
        if (existingTags.size() != tagIds.size()) {
            throw new ValidationException("One or more tags do not exist.");
        }
        return existingTags;
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ValidationException("User not found with ID: " + userId));
    }
}
