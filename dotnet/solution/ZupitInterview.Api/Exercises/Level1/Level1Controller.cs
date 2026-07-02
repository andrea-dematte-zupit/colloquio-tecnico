using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level1;

[ApiController]
[Route("api/level1")]
public class Level1Controller : ControllerBase
{
    // --- N1.1 FizzBuzz ---
    [HttpGet("fizzbuzz")]
    public ActionResult<IEnumerable<string>> GetFizzBuzz([FromQuery] int count = 15)
        => Ok(FizzBuzz.Generate(count));

    // --- N1.2 Endpoint GET con lista in memoria ---
    // ESERCIZIO N1.2: completa GetCities() in modo che ritorni la lista di città.
    // Requisiti: ritorna 200 OK con una lista di stringhe (es. capoluoghi).
    [HttpGet("cities")]
    public ActionResult<IEnumerable<string>> GetCities()
    {
        var cities = new[] { "Trento", "Verona", "Padova", "Milano", "Bologna", "Roma" };
        return Ok(cities);
    }

    // --- N1.3 LINQ ---
    [HttpGet("stats")]
    public ActionResult<IEnumerable<CityStat>> GetStats()
        => Ok(PersonStats.ByCity(PersonStats.Sample));
}
