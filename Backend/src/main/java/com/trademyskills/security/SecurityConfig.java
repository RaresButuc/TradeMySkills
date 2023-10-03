package com.trademyskills.security;

import com.trademyskills.enums.TypeOfUser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain mainSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(requests ->
                        (requests

                                .requestMatchers("/", "/join-us", "/login", "/contact", "/all-ads").permitAll()
                                .anyRequest())
                                .authenticated()
                )
                .formLogin(form -> form.defaultSuccessUrl("/"));
//                .oauth2Login(form -> form.defaultSuccessUrl("/"));
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

        UserDetails userAdmin = User.withUsername("admin-1")
                .password(encoder.encode("passwordadmin1"))
                .roles(TypeOfUser.ADMIN.getRoleName())
                .build();

        return new InMemoryUserDetailsManager(userAdmin);
    }
}
