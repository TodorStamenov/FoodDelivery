using FoodDelivery.Services;
using FoodDelivery.Services.Models.ViewModels.Categories;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Home")]
    public class HomeController : ApiController
    {
        private readonly ICategoryService category;

        public HomeController(ICategoryService category)
        {
            this.category = category;
        }

        [HttpGet]
        public IEnumerable<ListCategoriesWithProductsViewModel> Index()
        {
            return this.category.AllWithProducts();
        }
    }
}