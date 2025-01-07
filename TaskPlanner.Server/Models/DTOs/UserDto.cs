using System.ComponentModel.DataAnnotations;

public record UserDto(
    [Required] long Id,
    string? Name,
    Position? Position);