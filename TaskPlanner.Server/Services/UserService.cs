using TaskPlanner.Server.DataAccess.Reposutory;
using TaskPlanner.Server.Services;

namespace Core.Services;
public class UserService
{
    private readonly PasswordHasher _hasher;
    private readonly UserRepository _repository;
    private readonly JwtProvider _jwtProvider;

    public UserService(PasswordHasher hasher,
                       JwtProvider jwtProvider,
                       UserRepository repository)
    {
        _hasher = hasher;
        _repository = repository;
        _jwtProvider = jwtProvider;
    }

    public void Register(string login, string password, string role)
    {
        if (_repository.GetByLogin(login) != null)
            throw new Exception("Логин занят");

        var hashedPassword = _hasher.Generate(password);
        

        var user = new UserEntity
        {
            Login = login,
            PasswordHash = hashedPassword,
            Role = role
        };

        _repository.Add(user);
    }

    public string Login(string login, string password)
    {
        var user = _repository.GetByLogin(login)
            ?? throw new Exception();       

        var result = _hasher.Verify(password, user.PasswordHash);

        if (result == false)
        {
            throw new Exception();
        }
        var token = _jwtProvider.GenerateToken(user);

        return token;
    }   

    public async Task<List<UserDto>> GetUsers()
    {
        var users = await _repository.GetUsersAsync();

        return users.Select(x => new UserDto(
            x.Id,
            x.Name,
            x.Position)).ToList();
    }
}


