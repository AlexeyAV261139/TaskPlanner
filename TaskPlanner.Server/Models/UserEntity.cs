using CSharpFunctionalExtensions;

public class UserEntity : Entity
{
    public string Login { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }
    public string? Name { get; set; }
    public Position? Position { get; set; }
    public List<TaskEntity> TaskEntities { get; set; } = [];
}