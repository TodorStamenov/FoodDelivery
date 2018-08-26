using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersModeratorViewModel : ListOrdersViewModel
    {
        public int ProductsCount { get; set; }

        public string Executor { get; set; }

        public decimal Price { get; set; }

        public IEnumerable<ListProductsViewModel> Products { get; set; }
    }
}