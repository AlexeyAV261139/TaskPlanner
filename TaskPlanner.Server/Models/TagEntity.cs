using CSharpFunctionalExtensions;

namespace TaskPlanner.Server.Models;

public class TagEntity : Entity
{
    public required string Name { get; set; }
    public List<TaskEntity> Tasks { get; set; }
}
