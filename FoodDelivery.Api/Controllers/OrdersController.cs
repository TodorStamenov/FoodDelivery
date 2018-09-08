using FoodDelivery.Common;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Orders")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class OrdersController : ApiController
    {
        private const int LoadElements = 10;

        private readonly IOrderService order;

        public OrdersController(IOrderService order)
        {
            this.order = order;
        }

        [HttpGet]
        [Route("moderator/history/{loadedElements?}")]
        public IEnumerable<ListOrdersModeratorViewModel> ModeratorHistory(int loadedElements = 0)
        {
            return this.order.ModeratorHistory(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("moderator/queue/{loadedElements?}")]
        public IEnumerable<ListOrdersModeratorViewModel> ModeratorQueue(int loadedElements = 0)
        {
            return this.order.ModeratorQueue(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("employee/queue")]
        [OverrideAuthorization]
        [Authorize(Roles = CommonConstants.EmployeeRole)]
        public IEnumerable<ListOrdersEmployeeViewModel> MyQueue()
        {
            return this.order.EmployeeQueue(User.Identity.GetUserId());
        }

        [HttpGet]
        [Route("user/orders/{loadedElements?}")]
        [OverrideAuthorization]
        [Authorize]
        public IEnumerable<ListOrdersUserViewModel> UserOrders(int loadedElements = 0)
        {
            return this.order.UserOrder(User.Identity.GetUserId(), LoadElements, loadedElements);
        }

        [HttpPost]
        [Route("employee/updateQueue")]
        [OverrideAuthorization]
        [Authorize(Roles = CommonConstants.EmployeeRole)]
        public IHttpActionResult UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model)
        {
            this.order.UpdateQueue(model);
            return Ok($"{nameof(Order)} queue successfully updated");
        }

        [HttpGet]
        [Route("details/{id}")]
        public IHttpActionResult Details(Guid id)
        {
            try
            {
                OrderDetailsViewModel model = this.order.Details(id);
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}