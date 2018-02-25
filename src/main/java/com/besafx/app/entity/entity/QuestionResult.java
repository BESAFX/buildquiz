package com.besafx.app.entity.entity;
public enum QuestionResult {
    Right_Answer("اجابة صحيحة"),
    Wrong_Answer("اجابة خاطئة"),
    NO_Answer("غير مجاب");
    private String name;
    QuestionResult(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static QuestionResult findByName(String name){
        for(QuestionResult v : values()){
            if( v.getName().equals(name)){
                return v;
            }
        }
        return null;
    }
    public static QuestionResult findByValue(String value){
        for(QuestionResult v : values()){
            if( v.name().equals(value)){
                return v;
            }
        }
        return null;
    }
}
