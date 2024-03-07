package com.trademyskills;

import com.trademyskills.InitDB.InitDBTypeOfAd;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class MainApplication {
   final InitDBTypeOfAd initDBTypeOfAd;



    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

    @PostConstruct
    public void seedDatabase() {
        initDBTypeOfAd.seedDB();
    }
}