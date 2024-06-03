package com.cmpt276.asn2.models;

import com.cmpt276.asn2.Rarity;
import jakarta.persistence.*;

@Entity
@Table(name="rectangles")
public class Rectangle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    private String name;
    private int width;
    private int height;
    private int color;
    private int area;
    private Rarity rarity;

    public Rectangle() {
    }

    public Rectangle(String name, int width, int height, int color, Rarity rarity) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.color = color;
        this.area = width * height;
        this.rarity = rarity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
        this.area = width * this.height;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
        this.area = height * this.width;
    }

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
        this.color = color;
    }

    public int getArea() {
        return area;
    }

    public int getUid() {
        return uid;
    }

    public Rarity getRarity() {
        return rarity;
    }

    public void setRarity(Rarity rarity) {
        this.rarity = rarity;
    }
}
