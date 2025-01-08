using System.ComponentModel.DataAnnotations;

namespace Core.Requests;

public record CreateTagRequest(
    [Required] string Name);

