using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Ingredients;
using FoodDelivery.Services.Models.ViewModels.Ingredients;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Ingredients")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class IngredientsController : ApiController
    {
        private const int PageSize = 10;
        private const string Ingredient = "Ingredient";

        private readonly IIngredientService ingredient;

        public IngredientsController(IIngredientService ingredient)
        {
            this.ingredient = ingredient;
        }

        public IHttpActionResult Get([FromUri]int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new IngredientsViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.ingredient.GetTotalEntries(),
                Ingredients = this.ingredient.All(page, PageSize)
            });
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetProduct(Guid? id)
        {
            try
            {
                IngredientViewModel model = this.ingredient.GetIngredient(id.GetValueOrDefault());
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        [Route("{id}")]
        public IHttpActionResult Put(Guid? id, IngredientBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.ingredient.Edit(id.GetValueOrDefault(), model.Name, model.IngredientType);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Ingredient, CommonConstants.Edited));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Post(IngredientBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.ingredient.Create(model.Name, model.IngredientType);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Ingredient, CommonConstants.Created));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpGet]
        [Route("types")]
        public IEnumerable<string> Types()
        {
            return this.ingredient.GetTypes();
        }
    }
}