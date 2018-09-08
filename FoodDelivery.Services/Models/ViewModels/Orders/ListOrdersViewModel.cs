using System;

namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersViewModel
    {
        public Guid Id { get; set; }

        public string Status { get; set; }

        public string User { get; set; }

        public string TimeStamp { get; set; }
    }
}