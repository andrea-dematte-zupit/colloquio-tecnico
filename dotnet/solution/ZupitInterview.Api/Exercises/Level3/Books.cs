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
/// Obiettivo: implementare una ricerca paginata sul DbSet&lt;Book&gt;.
///
/// Requisiti per SearchAsync:
///  1. Se `search` è valorizzato, filtra i libri il cui Title O Author
///     contiene `search` (case-insensitive va benissimo con Contains).
///  2. Ordina per Title.
///  3. Applica la paginazione: salta (page-1)*pageSize, prendi pageSize.
///  4. Ritorna PagedResult con Items, Total (conteggio PRIMA della paginazione),
///     Page e PageSize. Usa le versioni async (ToListAsync, CountAsync).
///
/// Endpoint per provare: GET /api/level3/books?search=&page=1&pageSize=10
/// </summary>
public class BookRepository : IBookRepository
{
    private readonly LibraryDbContext _db;

    public BookRepository(LibraryDbContext db)
    {
        _db = db;
    }

    public async Task<PagedResult<Book>> SearchAsync(string? search, int page, int pageSize, CancellationToken ct)
    {
        var query = _db.Books.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(b => b.Title.ToLower().Contains(term) || b.Author.ToLower().Contains(term));
        }

        var total = await query.CountAsync(ct);

        var items = await query
            .OrderBy(b => b.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return new PagedResult<Book>(items, total, page, pageSize);
    }
}
