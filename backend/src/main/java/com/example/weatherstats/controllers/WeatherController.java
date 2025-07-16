@RestController
@RequestMapping("/api/weather")
@CrossOrigin
public class WeatherController {
    @Autowired
    private CityWeatherRepository repo;

    @GetMapping
    public List<CityWeather> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public CityWeather save(@RequestBody CityWeather cw) {
        return repo.save(cw);
    }
}