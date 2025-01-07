using Microsoft.EntityFrameworkCore;

namespace TaskPlanner.Server.DataAccess.Reposutory;

public class UserRepository
{
    private readonly ApplicationContext _context;

    public UserRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Add(UserEntity user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public UserEntity? GetByLogin(string login)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.Login == login);
        return user;
    }

    public UserEntity GetById(long id)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.Id == id) ?? throw new Exception();

        return user;
    }

    public async Task<List<UserEntity>> GetUsersAsync()
    {
        var users = await _context.Users.ToListAsync();
        return users;
    }        
}
