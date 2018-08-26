using FoodDelivery.Services.Models.ViewModels.Ingredients;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Products
{
    public class ListProductsWithIngredientsViewModel : ProductViewModel
    {
        public IEnumerable<IngredientViewModel> Mains { get; set; }

        public IEnumerable<IngredientViewModel> Toppings { get; set; }
    }
}