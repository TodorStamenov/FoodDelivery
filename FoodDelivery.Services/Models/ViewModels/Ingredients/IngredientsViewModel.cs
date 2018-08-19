using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Ingredients
{
    public class IngredientsViewModel : BasePageViewModel
    {
        public IEnumerable<ListIngredientsViewModel> Ingredients { get; set; }
    }
}