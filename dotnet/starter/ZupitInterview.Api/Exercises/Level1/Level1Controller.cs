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

    // ESERCIZIO N1.2 — ritorna l'elenco delle città.
    [HttpGet("cities")]
    public ActionResult<IEnumerable<string>> GetCities()
    {
        // TODO: implementa
        throw new NotImplementedException();
    }

    // --- N1.3 LINQ ---
    [HttpGet("stats")]
    public ActionResult<IEnumerable<CityStat>> GetStats()
        => Ok(PersonStats.ByCity(PersonStats.Sample));
}
