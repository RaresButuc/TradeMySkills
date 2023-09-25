package com.trademyskills;

import com.trademyskills.service.InitDB.InitDBTypeOfAd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class MainApplication {
    InitDBTypeOfAd initDBTypeOfAd;

    @Autowired
    public MainApplication(InitDBTypeOfAd initDBTypeOfAd) {
        this.initDBTypeOfAd = initDBTypeOfAd;
    }

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

    @PostConstruct
    public void seedDatabase() {
        initDBTypeOfAd.seedDB();
    }
}