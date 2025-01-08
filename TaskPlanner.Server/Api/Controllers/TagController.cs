using Core.Requests;
using DAL.Reposutory;
using Microsoft.AspNetCore.Mvc;

namespace TaskPlanner.Server.Apis.Controllers;

[ApiController]
[Route("[controller]")]
public class TagController : ControllerBase
{
    private readonly TagRepository _tagReposytory;

    public TagController(TagRepository tagReposytory)
    {
        _tagReposytory = tagReposytory;
    }

    [HttpPost]
    public async Task<IResult> Create(CreateTagRequest request)
    {
        await _tagReposytory.CreateTag(request.Name);
        return Results.Ok();
    }

    [HttpGet]
    public async Task<IResult> GetTags()
    {
        var tags = await _tagReposytory.GetAllTag();
        return Results.Ok(tags);
    }
}
