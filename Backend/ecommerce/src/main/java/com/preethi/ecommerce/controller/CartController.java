package com.preethi.ecommerce.controller;

import com.preethi.ecommerce.entity.Cart;
import com.preethi.ecommerce.entity.User;
import com.preethi.ecommerce.repository.UserRepository;
import com.preethi.ecommerce.service.CartService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    public CartController(CartService cartService, UserRepository userRepository) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public Cart getCart() {
        return cartService.getCartByUser(getCurrentUser());
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long productId, @RequestParam int quantity) {
        return cartService.addToCart(getCurrentUser(), productId, quantity);
    }

    @DeleteMapping("/remove/{productId}")
    public Cart removeFromCart(@PathVariable Long productId) {
        return cartService.removeFromCart(getCurrentUser(), productId);
    }
}
