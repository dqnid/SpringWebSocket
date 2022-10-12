package com.security;

public class InMessage {
    private String request;
    public InMessage(){}
    public InMessage(String request){
        this.request = request;
    }
    public String getRequest(){
        return request;
    }

    public void setString(String request){
        this.request = request;
    }
}
