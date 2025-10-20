package com.yourcompany.passwordgeneratortool.model;

public class PasswordTemplate {
    private String name;
    private String description;
    private Characters characters;
    
    public PasswordTemplate() {
    }
    
    public PasswordTemplate(String name, String description, Characters characters) {
        this.name = name;
        this.description = description;
        this.characters = characters;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Characters getCharacters() {
        return characters;
    }
    
    public void setCharacters(Characters characters) {
        this.characters = characters;
    }
}