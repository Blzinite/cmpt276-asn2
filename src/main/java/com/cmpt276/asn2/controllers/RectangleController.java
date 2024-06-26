package com.cmpt276.asn2.controllers;

import com.cmpt276.asn2.Rarity;
import com.cmpt276.asn2.models.Rectangle;
import com.cmpt276.asn2.models.RectangleRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
        List<Rectangle> rectangles = rectRepo.findAll(Sort.by(Sort.Direction.ASC, "uid"));
        // End of db call

        model.addAttribute("rectangles", rectangles);
        return "database/home";
    }

    // Generate a random number
    private int genNum(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    // Generates 10 entries to test features of the website
    @GetMapping("/debug-flood")
    public String stressTest() {
        for (int i=0; i<10; i++) {
            rectRepo.save(new Rectangle(
                    Integer.toString(genNum(1,100)),
                    genNum(100,150),
                    genNum(100,250),
                    genNum(0,16777215),
                    Rarity.values()[genNum(1,6)]
            ));
        }
        return "database/success";
    }

    // Receive a post request and add rectangle with json data
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

    // Same as add but gets the rectangle by ID, then update the values from json data
    @PostMapping("/db-update")
    public String updateRectangle(@RequestParam Map<String, String> selection, HttpServletResponse response) {
        Rectangle entry = rectRepo.getReferenceById(Integer.parseInt(selection.get("id")));
        entry.setName(selection.get("name"));
        entry.setWidth(Integer.parseInt(selection.get("width")));
        entry.setHeight(Integer.parseInt(selection.get("height")));
        entry.setColor(Integer.parseInt(selection.get("color"), 16));
        entry.setRarity(Rarity.valueOf(selection.get("rarity")));
        rectRepo.save(entry);
        return "database/success";
    }

    // Deletes all entries in the database
    @GetMapping("/db-purge")
    public String purgeAll() {
        rectRepo.deleteAll();
        return "database/success";
    }

    // Gets a list of rectangles in a json post, then delete them
    @PostMapping("/db-purgeSelected")
    public String purgeSelected(@RequestParam Map<String, String> messenger, HttpServletResponse response) {
        for (String key : messenger.keySet()) {
            rectRepo.deleteById(Integer.parseInt(key));
        }
        return "database/success";
    }

    // Get a post request, consisting of 1 entry and deletes it
    @PostMapping("/db-purgeOne")
    public String purgeOne(@RequestParam Map<String, String> messenger, HttpServletResponse response) {
        rectRepo.deleteById(Integer.parseInt(messenger.get("sinner")));
        return "database/success";
    }

    // Use dynamic routing to create pages for rectangles
    @GetMapping("/rectangles/ID={id}")
    public String rectangleData(@PathVariable String id, Model model) {
        model.addAttribute("rectangle", rectRepo.getReferenceById(Integer.parseInt(id)));
        return "database/info-page";
    }
}
