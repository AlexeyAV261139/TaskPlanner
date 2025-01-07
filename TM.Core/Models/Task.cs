using TM.Core.Abstract;

public class Task : BaseModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreationDate { get; set; }   
    public User Executor { get; set; }
}
