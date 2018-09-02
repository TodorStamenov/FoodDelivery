using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Toppings
{
    public class ToppingsViewModel : BasePageViewModel
    {
        public IEnumerable<ListToppingsViewModel> Toppings { get; set; }
    }
}