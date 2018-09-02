using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Toppings;
using FoodDelivery.Services.Models.ViewModels.Toppings;
using System;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Toppings")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class ToppingsController : ApiController
    {
        private const int PageSize = 10;
        private const string Topping = "Topping";

        private readonly IToppingService topping;

        public ToppingsController(IToppingService topping)
        {
            this.topping = topping;
        }

        public IHttpActionResult Get([FromUri]int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new ToppingsViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.topping.GetTotalEntries(),
                Toppings = this.topping.All(page, PageSize)
            });
        }

        public IHttpActionResult Get(Guid? id)
        {
            try
            {
                ToppingViewModel model = this.topping.GetTopping(id.GetValueOrDefault());
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Put(Guid? id, [FromBody]ToppingBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.topping.Edit(id.GetValueOrDefault(), model.Name);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Topping, CommonConstants.Edited));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Post([FromBody]ToppingBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.topping.Create(model.Name);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Topping, CommonConstants.Created));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Delete(Guid? id)
        {
            try
            {
                this.topping.Delete(id.GetValueOrDefault());
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Topping, CommonConstants.Deleted));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}