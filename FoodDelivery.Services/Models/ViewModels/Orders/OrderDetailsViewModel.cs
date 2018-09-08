using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class OrderDetailsViewModel : ListOrdersModeratorViewModel
    {
        public string Address { get; set; }

        public string Executor { get; set; }

        public IEnumerable<ListProductsWithToppingsModeratorViewModel> Products { get; set; }
    }
}