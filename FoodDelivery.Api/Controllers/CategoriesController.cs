using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    [RoutePrefix("api/Moderator")]
    public class CategoriesController : ApiController
    {
        private readonly ICategoryService category;

        public CategoriesController(ICategoryService category)
        {
            this.category = category;
        }

        [HttpGet]
        [Route("Category")]
        public IEnumerable<ListCategoriesViewModel> Get()
        {
            return this.category.Categories();
        }

        [HttpGet]
        [Route("Category/{id}")]
        public IHttpActionResult Get(int id)
        {
            EditCategoryViewModel model = this.category.Category(id);

            if (model == null)
            {
                return BadRequest($"Category with {id} id is not existing in database");
            }

            return Ok(model);
        }

        [HttpGet]
        [Route("Category/{id}/Products")]
        public IHttpActionResult Products(int id)
        {
            IEnumerable<ListProductsViewModel> model = this.category.Products(id);

            if (model == null)
            {
                return BadRequest($"Category with {id} id is not existing in database");
            }

            return Ok(model);
        }

        [HttpPost]
        [Route("Category")]
        public IHttpActionResult Post(CreateCategoryBindingModel model)
        {
            try
            {
                this.category.Create(model);
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }

            return Ok("Category was successfully deleted.");
        }

        [HttpPut]
        [Route("Category/{id}")]
        public IHttpActionResult Put(int id, [FromBody]EditCategoryBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.category.Edit(id, model);
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }

            return Ok("Category was successfully edited");
        }
    }
}