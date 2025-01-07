using Microsoft.EntityFrameworkCore;
using TM.DAL.Context;

namespace TM.DAL.Reposutory;

public class UserRepository
{
    private readonly ApplicationContext _context;

    public UserRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Add(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public User? GetByLogin(string login)
    {
        var user = _context.Users
            .AsNoTracking()
            .FirstOrDefault(u => u.Login == login);
        return user;
    }

    public User GetById(long id)
    {
        var user = _context.Users
            .AsNoTracking()
            .FirstOrDefault(u => u.Id == id) ?? throw new Exception();

        return user;
    }
}
