using Microsoft.EntityFrameworkCore;

namespace ZupitInterview.Api.Exercises.Level3;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
}

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);

public class LibraryDbContext : DbContext
{
    public LibraryDbContext(DbContextOptions<LibraryDbContext> options) : base(options) { }

    public DbSet<Book> Books => Set<Book>();
}

public interface IBookRepository
{
    Task<PagedResult<Book>> SearchAsync(string? search, int page, int pageSize, CancellationToken ct);
}

/// <summary>
/// ESERCIZIO N3.1 — Repository + EF Core
/// Implementa SearchAsync: ricerca paginata sui libri (filtro su titolo/autore
/// case-insensitive, ordinata per titolo) con il totale complessivo nel PagedResult.
/// Endpoint: GET /api/level3/books?search=&page=1&pageSize=10
/// </summary>
public class BookRepository : IBookRepository
{
    private readonly LibraryDbContext _db;

    public BookRepository(LibraryDbContext db)
    {
        _db = db;
    }

    public Task<PagedResult<Book>> SearchAsync(string? search, int page, int pageSize, CancellationToken ct)
    {
        // TODO: implementa
        throw new NotImplementedException();
    }
}
