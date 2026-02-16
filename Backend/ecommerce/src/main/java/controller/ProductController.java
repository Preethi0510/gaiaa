package controller;

import entity.Product;
import service.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Product addProduct(@RequestParam String name,
                              @RequestParam double price,
                              @RequestParam String description,
                              @RequestParam MultipartFile file) throws Exception {

        String dir = "uploads/";
        new File(dir).mkdirs();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        file.transferTo(new File(dir + fileName));

        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setDescription(description);
        p.setImageUrl("http://localhost:8080/images/" + fileName);

        return service.save(p);
    }

    @GetMapping
    public java.util.List<Product> all() {
        return service.findAll();
    }
}
