namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersModeratorViewModel : ListOrdersViewModel
    {
        public int ProductsCount { get; set; }

        public decimal Price { get; set; }
    }
}