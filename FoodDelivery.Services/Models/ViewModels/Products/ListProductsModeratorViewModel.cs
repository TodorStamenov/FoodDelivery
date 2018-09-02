namespace FoodDelivery.Services.Models.ViewModels.Products
{
    public class ListProductsModeratorViewModel : ListProductsViewModel
    {
        public double Mass { get; set; }

        public string Category { get; set; }

        public string Rating { get; set; }
    }
}