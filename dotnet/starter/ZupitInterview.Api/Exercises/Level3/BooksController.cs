using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level3;

[ApiController]
[Route("api/level3/books")]
public class BooksController : ControllerBase
{
    private readonly IBookRepository _repo;

    public BooksController(IBookRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<Book>>> Search(
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken ct = default)
    {
        var result = await _repo.SearchAsync(search, page, pageSize, ct);
        return Ok(result);
    }
}
