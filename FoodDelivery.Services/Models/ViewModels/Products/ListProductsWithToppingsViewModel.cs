using FoodDelivery.Services.Models.ViewModels.Toppings;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Products
{
    public class ListProductsWithToppingsViewModel : ProductViewModel
    {
        public IEnumerable<ListToppingsViewModel> Toppings { get; set; }
    }
}