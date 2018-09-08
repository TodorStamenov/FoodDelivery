using FoodDelivery.Services.Models.ViewModels.Toppings;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Products
{
    public class ListProductsWithToppingsModeratorViewModel : ListProductsViewModel
    {
        public IEnumerable<ListToppingsViewModel> Toppings { get; set; }
    }
}