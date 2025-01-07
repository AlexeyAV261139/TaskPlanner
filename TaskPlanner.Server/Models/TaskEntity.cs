using CSharpFunctionalExtensions;

public class TaskEntity : Entity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreationDate { get; set; }
    public List<UserEntity> Executors { get; set; } = [];
}
