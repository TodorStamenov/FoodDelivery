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
        private const string Category = "Category";
        private const string ImageSizeMessage = "Uploaded file must be of type image with size less then 1 MB";

        private readonly ICategoryService category;

        public CategoriesController(ICategoryService category)
        {
            this.category = category;
        }

        public IEnumerable<ListCategoriesViewModel> Get()
        {
            return this.category.Categories();
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
                return BadRequest(bre.Message);
            }
        }

        [HttpGet]
        [Route("{id}/Products")]
        public IHttpActionResult Products(int id)
        {
            try
            {
                IEnumerable<ListProductsViewModel> model = this.category.Products(id);
                return Ok(model);
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
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
                return BadRequest("Category name and image are required");
            }

            HttpPostedFile image = images[0];

            if (!image.ContentType.Contains("image")
                || image.ContentLength > DataConstants.CategoryConstants.MaxImageSize)
            {
                return BadRequest(ImageSizeMessage);
            }

            try
            {
                this.category.Create(name, image.ToByteArray());
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }

            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Category, CommonConstants.Created));
        }

        public IHttpActionResult Put(int id)
        {
            string name = HttpContext.Current.Request.Form["name"];
            HttpPostedFile image = HttpContext.Current.Request.Files[0];

            if (!image.ContentType.Contains("image")
                || image.ContentLength > DataConstants.CategoryConstants.MaxImageSize)
            {
                return BadRequest(ImageSizeMessage);
            }

            try
            {
                this.category.Edit(id, name, image.ToByteArray());
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }

            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, Category, CommonConstants.Edited));
        }
    }
}