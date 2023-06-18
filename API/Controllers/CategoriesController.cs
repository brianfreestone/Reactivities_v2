using Application.Categories;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var result = await Mediator.Send(new List.Query());

            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(Category category)
        { 
            var result = await Mediator.Send(new Create.Command { Category = category });   

            return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategory(Guid id, Category category)
        {
            category.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command {  Category = category }));    
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }


    }
}
