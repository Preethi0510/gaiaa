package com.preethi.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.preethi.ecommerce.entity.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {
}
