package com.besafx.app.entity.entity;
public enum ContentType {
    HTML("ترميز"),
    TEXT("نص");
    private String name;
    ContentType(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static ContentType findByName(String name){
        for(ContentType v : values()){
            if( v.getName().equals(name)){
                return v;
            }
        }
        return null;
    }
    public static ContentType findByValue(String value){
        for(ContentType v : values()){
            if( v.name().equals(value)){
                return v;
            }
        }
        return null;
    }
}
