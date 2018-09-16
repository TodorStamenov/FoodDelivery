using FoodDelivery.Common;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Orders;
using FoodDelivery.Services.Models.ViewModels.Products;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        private const int LoadElements = 10;

        private readonly IOrderService order;
        private readonly IOrderManager orderManager;
        private readonly IProductService product;

        public OrdersController(
            IOrderService order,
            IOrderManager orderManager,
            IProductService product)
        {
            this.order = order;
            this.orderManager = orderManager;
            this.product = product;
        }

        [HttpGet]
        [Route("moderator/history/{loadedElements?}")]
        [Authorize(Roles = CommonConstants.ModeratorRole)]
        public IEnumerable<ListOrdersModeratorViewModel> ModeratorHistory(int loadedElements = 0)
        {
            return this.order.ModeratorHistory(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("moderator/queue/{loadedElements?}")]
        [Authorize(Roles = CommonConstants.ModeratorRole)]
        public IEnumerable<ListOrdersModeratorViewModel> ModeratorQueue(int loadedElements = 0)
        {
            return this.order.ModeratorQueue(LoadElements, loadedElements);
        }

        [HttpGet]
        [Route("employee/queue")]
        [Authorize(Roles = CommonConstants.EmployeeRole)]
        public IEnumerable<ListOrdersEmployeeViewModel> EmployeeQueue()
        {
            return this.order.EmployeeQueue(User.Identity.GetUserId());
        }

        [HttpPost]
        [Route("addProduct")]
        public IHttpActionResult AddProduct([FromBody]Guid productId)
        {
            this.orderManager.AddProduct(User.Identity.GetUserId(), productId);
            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Product), CommonConstants.Added));
        }

        [HttpPost]
        [Route("removeProduct")]
        public IHttpActionResult RemoveProduct([FromBody]Guid productId)
        {
            this.orderManager.RemoveProduct(User.Identity.GetUserId(), productId);
            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Product), CommonConstants.Removed));
        }

        [HttpPost]
        [Route("clearProducts")]
        public IHttpActionResult ClearProducts()
        {
            this.orderManager.ClearProducts(User.Identity.GetUserId());
            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Order), CommonConstants.Cleared));
        }

        [HttpGet]
        [Route("user/pending")]
        public IEnumerable<ListExtendedProductsWithToppingsViewModel> UserPending()
        {
            IEnumerable<Guid> productIds = this.orderManager.GetProducts(User.Identity.GetUserId());
            return this.product.All(productIds);
        }

        [HttpPost]
        [Route("submitOrder")]
        public IHttpActionResult SubmitOrder()
        {
            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Order), CommonConstants.Created));
        }

        [HttpGet]
        [Route("user/queue")]
        public IEnumerable<ListOrdersUserViewModel> UserQueue()
        {
            return this.order.UserQueue(User.Identity.GetUserId());
        }

        [HttpGet]
        [Route("user/history/{loadedElements?}")]
        public IEnumerable<ListOrdersUserViewModel> UserHistory(int loadedElements = 0)
        {
            return this.order.UserHistory(User.Identity.GetUserId(), LoadElements, loadedElements);
        }

        [HttpPost]
        [Route("employee/updateQueue")]
        [Authorize(Roles = CommonConstants.EmployeeRole)]
        public IHttpActionResult UpdateQueue(IEnumerable<UpdateOrdersBindingModel> model)
        {
            this.order.UpdateQueue(model);
            return Ok($"{nameof(Order)} queue successfully updated");
        }

        [HttpGet]
        [Route("details/{id}")]
        [Authorize(Roles = CommonConstants.ModeratorRole)]
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