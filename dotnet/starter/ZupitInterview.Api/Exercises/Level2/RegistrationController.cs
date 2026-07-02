using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level2;

/// <summary>
/// ESERCIZIO N2.3 — Validazione DTO
/// Valida l'input: Username (obbligatorio, 3–20 caratteri), Email valida, Age tra 18 e 120.
/// Endpoint: POST /api/register
/// </summary>
public class RegisterDto
{
    // TODO: validazione
    public string Username { get; set; } = "";

    // TODO: validazione
    public string Email { get; set; } = "";

    // TODO: validazione
    public int Age { get; set; }
}

[ApiController]
[Route("api/register")]
public class RegistrationController : ControllerBase
{
    [HttpPost]
    public IActionResult Register(RegisterDto dto)
    {
        return Ok(new { message = $"Benvenuto {dto.Username}!" });
    }
}
