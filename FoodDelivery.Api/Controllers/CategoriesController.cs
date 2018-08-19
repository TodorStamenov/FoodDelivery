using FoodDelivery.Api.Infrastructure.Extensions;
using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    [RoutePrefix("api/Categories")]
    public class CategoriesController : ApiController
    {
        private const string Image = "image";
        private const string Category = "Category";
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

        public IEnumerable<ListCategoriesViewModel> Get()
        {
            return this.category.All();
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                CategoryViewModel model = this.category.GetCategory(id);
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpGet]
        [Route("{id}/Products")]
        public IHttpActionResult Products(int id)
        {
            try
            {
                IEnumerable<ListProductsViewModel> model = this.product.All(id);
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }

        public IHttpActionResult Put(int id)
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
                this.category.Edit(id, name, image?.ToByteArray());
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Category, CommonConstants.Edited));
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
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Category, CommonConstants.Created));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorMessage, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}