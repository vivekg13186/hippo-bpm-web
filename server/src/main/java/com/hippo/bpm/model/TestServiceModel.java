package com.hippo.bpm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "test")
public class TestServiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 555)
    private String appName;

    @Column(nullable = false, length = 100)
    private String serviceName;

    @Column(nullable = false)
    private String input;

}
