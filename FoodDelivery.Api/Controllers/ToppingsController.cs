using FoodDelivery.Common;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Toppings;
using FoodDelivery.Services.Models.ViewModels.Toppings;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Toppings")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class ToppingsController : ApiController
    {
        private readonly IToppingService topping;

        public ToppingsController(IToppingService topping)
        {
            this.topping = topping;
        }

        public IEnumerable<ListToppingsViewModel> Get()
        {
            return this.topping.All();
        }

        public IHttpActionResult Get(Guid? id)
        {
            try
            {
                ToppingBindingModel model = this.topping.GetTopping(id.GetValueOrDefault());
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, bre.Message);
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
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Topping), CommonConstants.Edited));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, bre.Message);
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
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Topping), CommonConstants.Created));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Delete(Guid? id)
        {
            try
            {
                this.topping.Delete(id.GetValueOrDefault());
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Topping), CommonConstants.Deleted));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}