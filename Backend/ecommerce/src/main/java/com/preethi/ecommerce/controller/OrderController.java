package com.preethi.ecommerce.controller;

import com.preethi.ecommerce.entity.Order;
import com.preethi.ecommerce.entity.User;
import com.preethi.ecommerce.repository.UserRepository;
import com.preethi.ecommerce.service.OrderService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderController(OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/checkout")
    public Order checkout() {
        return orderService.createOrder(getCurrentUser());
    }

    @GetMapping
    public List<Order> getMyOrders() {
        return orderService.getOrdersByUser(getCurrentUser());
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
