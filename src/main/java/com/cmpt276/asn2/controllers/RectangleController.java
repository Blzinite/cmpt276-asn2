package com.cmpt276.asn2.controllers;

import com.cmpt276.asn2.Rarity;
import com.cmpt276.asn2.models.Rectangle;
import com.cmpt276.asn2.models.RectangleRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class RectangleController {

    @Autowired
    private RectangleRepository rectRepo;

    @GetMapping("/home")
    public String home(Model model) {
        System.out.println("Init Test");

        // Get items from db
        List<Rectangle> rectangles = rectRepo.findAll();
        // end of db call

        model.addAttribute("rectangles", rectangles);
        return "database/home";
    }

    @PostMapping("/db-add")
    public String addRectangle(@RequestParam Map<String, String> newRect, HttpServletResponse response) {
        rectRepo.save(new Rectangle(
                newRect.get("name"),
                Integer.parseInt(newRect.get("width")),
                Integer.parseInt(newRect.get("height")),
                Integer.parseInt(newRect.get("color"), 16),
                Rarity.valueOf(newRect.get("rarity"))
        ));
        return "database/success";
    }

    @GetMapping("/db-purge")
    public String purgeAll() {
        rectRepo.deleteAll();
        return "database/success";
    }

    @PostMapping("/db-purgeOne")
    public String purgeOne(@RequestParam Map<String, String> messenger, HttpServletResponse response) {
        rectRepo.deleteById(Integer.parseInt(messenger.get("sinner")));
        return "database/success";
    }

    @GetMapping("/rectangles/{id}")
    public String rectangleData(@PathVariable String id, Model model) {
        model.addAttribute("rectangle", rectRepo.getReferenceById(Integer.parseInt(id)));
        return "database/info-page";
    }
}
