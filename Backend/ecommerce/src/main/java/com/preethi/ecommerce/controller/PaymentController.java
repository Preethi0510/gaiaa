package com.preethi.ecommerce.controller;

import com.preethi.ecommerce.entity.Payment;
import com.preethi.ecommerce.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public Payment processPayment(@RequestParam Long orderId, @RequestParam String paymentMethod) {
        return paymentService.processPayment(orderId, paymentMethod);
    }
}
