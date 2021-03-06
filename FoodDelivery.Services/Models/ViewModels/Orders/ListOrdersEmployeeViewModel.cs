﻿using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Orders
{
    public class ListOrdersEmployeeViewModel : ListOrdersViewModel
    {
        public string Address { get; set; }

        public IEnumerable<string> Statuses { get; set; }

        public IEnumerable<ListProductsWithToppingsViewModel> Products { get; set; }
    }
}