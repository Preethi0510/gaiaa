package com.preethi.ecommerce.controller;

import org.springframework.web.bind.annotation.*;

import com.preethi.ecommerce.config.JwtUtil;
import com.preethi.ecommerce.dto.*;
import com.preethi.ecommerce.entity.User;
import com.preethi.ecommerce.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest req) {
        authService.register(req);
        return "User registered";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        User u = authService.login(req);
        String token = jwtUtil.generateToken(u.getEmail());
        return new AuthResponse(token);
    }
}
