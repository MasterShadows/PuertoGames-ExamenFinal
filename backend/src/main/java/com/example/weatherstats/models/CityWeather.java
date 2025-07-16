@Entity
public class CityWeather {
    @Id @GeneratedValue
    private Long id;
    private String city;
    private Double temperature;
    private Integer humidity;
    private Integer pressure;
    private Double wind;

    // getters & setters
}