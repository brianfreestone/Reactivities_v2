using Application.Activities;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Application.Profiles.Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile(Profile profile)
        {
            return HandleResult(await Mediator.Send(new Application.Profiles.Edit.Command { Profile = profile }));
        }

        ///api/profiles/{username}/activities? predicate =‘thePredicate’”
        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate }));
        }
    }   
}
