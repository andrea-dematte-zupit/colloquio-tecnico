using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level2;

[ApiController]
[Route("api/greeting")]
public class GreetingController : ControllerBase
{
    private readonly IGreetingService _greeting;

    // Il service viene iniettato dal container DI (constructor injection).
    public GreetingController(IGreetingService greeting)
    {
        _greeting = greeting;
    }

    [HttpGet]
    public ActionResult<string> Get([FromQuery] string? name)
        => Ok(_greeting.Greet(name ?? ""));
}
