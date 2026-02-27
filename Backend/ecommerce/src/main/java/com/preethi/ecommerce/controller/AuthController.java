package com.preethi.ecommerce.controller;

import com.preethi.ecommerce.config.JwtUtil;
import com.preethi.ecommerce.dto.LoginRequest;
import com.preethi.ecommerce.dto.SignupRequest;
import com.preethi.ecommerce.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public String register(@RequestBody SignupRequest request) {

        authService.register(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );

        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        var userDetails = authService.loadUserByEmail(request.getEmail());

        String token = jwtUtil.generateToken(userDetails.getUsername());

        return token;
    }
}