package com.trademyskills.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.trademyskills.enums.Role;
import lombok.*;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String name;

    private String email;

    private String password;

    private String phoneNumber;

    @JsonIgnore
    @OneToMany(mappedBy = "worker")
    private List<Ad> adsAttends;

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private List<Ad> adsOwned;

    @JsonIgnore
    @ManyToMany(mappedBy = "rejectedWorkers")
    private List<Ad> adsRejected;

    @JsonIgnore
    @OneToMany(mappedBy = "from")
    private List<Rating> writtenRatings;

    @JsonIgnore
    @OneToMany(mappedBy = "to")
    private List<Rating> receivedRatings;

    private double averageRating;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
