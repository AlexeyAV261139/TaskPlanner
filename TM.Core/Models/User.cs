using TM.Core.Abstract;

public class User : BaseModel
{
    public string Login { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }
}