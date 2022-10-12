package com.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@SpringBootApplication
public class DataBaseAccess implements CommandLineRunner {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public static void main (String[] args) {
        SpringApplication.run (DataBaseAccess.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        final String select_query = "SELECT * from EVENTOS";
        //List<Event> = jdbcTemplate.query(select_query,EventMapper)
        /*String sql = "INSERT INTO eventos (id,nombre_evento,fecha) VALUES ('4','4','20/10/2022')";
        if (jdbcTemplate.update(sql)>0){
            System.out.println("Fila insertada.");
        } else {
            System.out.println("Error al insertar la fila");
        }*/
    }
}
