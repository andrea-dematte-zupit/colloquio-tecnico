using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level3;

/// <summary>
/// ESERCIZIO N3.3 — Middleware custom
/// Implementa InvokeAsync: se la pipeline solleva un'eccezione, rispondi con un
/// errore 500 in formato ProblemDetails. È già registrato in Program.cs.
/// Endpoint che lancia un errore: GET /api/level3/boom
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // TODO: implementa la gestione delle eccezioni
        await _next(context);
    }
}

[ApiController]
[Route("api/level3/boom")]
public class BoomController : ControllerBase
{
    [HttpGet]
    public IActionResult Boom()
    {
        throw new InvalidOperationException("Errore simulato per testare il middleware.");
    }
}
