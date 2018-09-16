using FoodDelivery.Services.Models.ViewModels.Toppings;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Products
{
    public class ListExtendedProductsWithToppingsViewModel : ListProductsViewModel
    {
        public IEnumerable<ListToppingsViewModel> Toppings { get; set; }
    }
}