package com.trademyskills.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow requests from http://localhost:3000
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*"); // Allow all HTTP methods
        config.addAllowedHeader("*");
        // You can also specify other CORS configuration options as needed
        // For example, you can allow specific HTTP methods, headers, etc.

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
