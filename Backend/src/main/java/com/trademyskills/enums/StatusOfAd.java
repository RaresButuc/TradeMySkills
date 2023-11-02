package com.trademyskills.enums;

public enum StatusOfAd {
    ACTIVE("ACTIVE"),
    PENDING("PENDING"),
    FINALISED("FINALISED");

    private final String name;

    StatusOfAd(String name) {
        this.name = name;
    }

    public static StatusOfAd getByName(String name) {
        return switch (name.toUpperCase()) {
            case "ACTIVE" -> StatusOfAd.ACTIVE;
            case "PENDING" -> StatusOfAd.PENDING;
            case "FINALISED" -> StatusOfAd.FINALISED;
            default -> StatusOfAd.ACTIVE;
        };
    }
}
