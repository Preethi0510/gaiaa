package com.preethi.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.preethi.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
