using FoodDelivery.Common;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Products;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Products")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class ProductsController : ApiController
    {
        private const int PageSize = 10;

        private readonly IProductService product;

        public ProductsController(IProductService product)
        {
            this.product = product;
        }

        public IHttpActionResult Get([FromUri]int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new ProductsViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.product.GetTotalEntries(),
                Products = this.product.All(page, PageSize)
            });
        }

        [HttpGet]
        [Route("{categoryId}/Products")]
        public IHttpActionResult Get(Guid? categoryId, [FromUri]int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new ProductsViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.product.GetTotalEntries(),
                Products = this.product.All(categoryId.GetValueOrDefault(), page, PageSize)
            });
        }

        public IHttpActionResult Get(Guid? id)
        {
            try
            {
                ProductBindigModel model = this.product.GetProduct(id.GetValueOrDefault());
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Put(Guid? id, [FromBody]ProductBindigModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.product.Edit(id.GetValueOrDefault(), model.Name, model.Price, model.Mass, model.CategoryId, model.ToppingIds);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Product), CommonConstants.Edited));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Post([FromBody]ProductBindigModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.product.Create(model.Name, model.Price, model.Mass, model.CategoryId, model.ToppingIds);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Product), CommonConstants.Created));
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
                this.product.Delete(id.GetValueOrDefault());
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Product), CommonConstants.Deleted));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}