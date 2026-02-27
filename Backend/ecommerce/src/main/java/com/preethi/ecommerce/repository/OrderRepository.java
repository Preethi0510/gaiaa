package com.preethi.ecommerce.repository;

import com.preethi.ecommerce.entity.Order;
import com.preethi.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
