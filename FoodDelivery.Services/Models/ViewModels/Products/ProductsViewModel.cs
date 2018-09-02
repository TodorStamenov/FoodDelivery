using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Products
{
    public class ProductsViewModel : BasePageViewModel
    {
        public IEnumerable<ListProductsModeratorViewModel> Products { get; set; }
    }
}