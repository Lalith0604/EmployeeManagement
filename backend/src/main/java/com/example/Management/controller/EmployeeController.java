package com.example.Management.controller;


import com.example.Management.model.Employee;
import com.example.Management.repositories.EmployeeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {
    private final EmployeeRepository repo;
    public EmployeeController(EmployeeRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    @GetMapping("/top5")
    public List<Employee> getTop5Employees() {
        return repo.findTop5ByOrderBySalaryDesc();
    }
}