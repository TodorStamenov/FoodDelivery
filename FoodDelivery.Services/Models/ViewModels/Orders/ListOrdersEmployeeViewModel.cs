using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersEmployeeViewModel : ListOrdersViewModel
    {
        public IEnumerable<string> Statuses { get; set; }

        public IEnumerable<ListProductsWithIngredientsViewModel> Products { get; set; }
    }
}