using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersUserViewModel
    {
        public Guid Id { get; set; }

        public string Status { get; set; }

        public string TimeStamp { get; set; }

        public int ProductsCount { get; set; }

        public decimal Price { get; set; }

        public IEnumerable<ListProductsViewModel> Products { get; set; }
    }
}