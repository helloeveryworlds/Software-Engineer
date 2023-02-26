package com.bossmode.backend;

import org.json.JSONObject;
import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import org.apache.commons.io.IOUtils;
import com.bossmode.backend.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        ObjectMapper mapper = new ObjectMapper();
        User customer= new User();
        customer.setEmail("test@gmail.com");
        customer.setPassword("123456");
        customer.setName("BossMode");
        customer.setAddress("Boston");
        customer.setEnabled(true);
        customer.setZipCode("02134");
        response.getWriter().print(mapper.writeValueAsString(customer));
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Read customer information from request body
        JSONObject jsonRequest = new JSONObject(IOUtils.toString(request.getReader()));
        String email = jsonRequest.getString("email");
        String name = jsonRequest.getString("name");
        String password = jsonRequest.getString("passowrd");
        String address = jsonRequest.getString("address");
        String zipCode = jsonRequest.getString("zipCode");

        // Print customer information to IDE console
        // 标准化输出
        System.out.println("Email is: " + email);
        System.out.println("Name is: " + name);
        System.out.println("Address is: " + address);
        System.out.println("Password is: " + password);
        System.out.println("ZipCode is: " + zipCode);
        // Return status = ok as response body to the client
        response.setContentType("application/json");
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("status", "ok");
        response.getWriter().print(jsonResponse);
    }

    public void destroy() {
    }
}