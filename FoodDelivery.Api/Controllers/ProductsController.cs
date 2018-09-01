using FoodDelivery.Common;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    public class ProductsController : ApiController
    {
        private readonly IProductService product;

        public ProductsController(IProductService product)
        {
            this.product = product;
        }

        [HttpGet]
        [Route("{id}/Products")]
        public IHttpActionResult Products(Guid? id)
        {
            try
            {
                IEnumerable<ListProductsViewModel> model = this.product.All(id.GetValueOrDefault());
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