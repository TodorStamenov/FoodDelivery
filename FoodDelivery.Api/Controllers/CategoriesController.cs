using FoodDelivery.Api.Infrastructure.Extensions;
using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Categories")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class CategoriesController : ApiController
    {
        private const int PageSize = 10;

        private const string Image = "image";
        private const string ImageSizeMessage = "Uploaded file must be of type image with size less then 1 MB";

        private readonly ICategoryService category;
        private readonly IProductService product;

        public CategoriesController(
            ICategoryService category,
            IProductService product)
        {
            this.category = category;
            this.product = product;
        }

        [HttpGet]
        [Route("all")]
        public IEnumerable<CategoryViewModel> GetCategories()
        {
            return this.category.Categories();
        }

        public IEnumerable<ListCategoriesViewModel> Get()
        {
            return this.category.All();
        }

        [HttpGet]
        [Route("{id}/Products")]
        public IHttpActionResult Get(Guid id, [FromUri]int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new ProductsViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.product.GetTotalEntries(id),
                Products = this.category.Products(id, page, PageSize)
            });
        }

        public IHttpActionResult Get(Guid? id)
        {
            try
            {
                CategoryViewModel model = this.category.GetCategory(id.GetValueOrDefault());
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Put(Guid? id)
        {
            string name = HttpContext.Current.Request.Form["name"];
            HttpFileCollection images = HttpContext.Current.Request.Files;

            if (string.IsNullOrEmpty(name) || string.IsNullOrWhiteSpace(name))
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, "Category name is required");
                return BadRequest(ModelState);
            }

            HttpPostedFile image = images.Count > 0
                ? images[0]
                : null;

            if (image != null
                && (!image.ContentType.Contains(Image) || image.ContentLength > DataConstants.CategoryConstants.MaxImageSize))
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, ImageSizeMessage);
                return BadRequest(ModelState);
            }

            try
            {
                this.category.Edit(id.GetValueOrDefault(), name, image?.ToByteArray());
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Category), CommonConstants.Edited));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Post()
        {
            string name = HttpContext.Current.Request.Form["name"];
            HttpFileCollection images = HttpContext.Current.Request.Files;

            if (string.IsNullOrEmpty(name) ||
                string.IsNullOrWhiteSpace(name) ||
                images.Count == 0)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, "Category name and image are required");
                return BadRequest(ModelState);
            }

            HttpPostedFile image = images[0];

            if (!image.ContentType.Contains(Image)
                || image.ContentLength > DataConstants.CategoryConstants.MaxImageSize)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, ImageSizeMessage);
                return BadRequest(ModelState);
            }

            try
            {
                this.category.Create(name, image.ToByteArray());
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Category), CommonConstants.Created));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}