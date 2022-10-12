package com.security;

public class Event {
    private String name;
    private int year;
    private int month;
    private int day;

    public Event(String name, int year, int month, int day){
        this.name = name;
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public String getName() {
        return name;
    }

    public int getYear() {
        return year;
    }

    public int getMonth() {
        return month;
    }

    public int getDay() {
        return day;
    }
}
