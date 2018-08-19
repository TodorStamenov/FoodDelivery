namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersViewModel
    {
        public int Id { get; set; }

        public decimal Price { get; set; }

        public string Status { get; set; }

        public string User { get; set; }

        public string Executor { get; set; }

        public string TimeStamp { get; set; }

        public int ProductsCount { get; set; }
    }
}