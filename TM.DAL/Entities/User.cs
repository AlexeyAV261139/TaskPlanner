using CSharpFunctionalExtensions;

public class User : Entity
{
    public string Login { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }      
}

