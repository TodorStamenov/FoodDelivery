using FoodDelivery.Data;
using FoodDelivery.Services.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace FoodDelivery.Services.Implementations
{
    public class OrderManager : IOrderManager
    {
        private readonly FoodDeliveryDbContext database;
        private readonly ConcurrentDictionary<string, ProductsList> orders;

        public OrderManager(FoodDeliveryDbContext database)
        {
            this.database = database;
            this.orders = new ConcurrentDictionary<string, ProductsList>();
        }

        public void AddProduct(string id, Guid productId)
        {
            this.GetOrderList(id).AddProduct(productId);
        }

        public void RemoveProduct(string id, Guid productId)
        {
            this.GetOrderList(id).RemoveProduct(productId);
        }

        public void ClearProducts(string id)
        {
            this.GetOrderList(id).ClearProducts();
        }

        public IEnumerable<Guid> GetProducts(string id)
        {
            return this.GetOrderList(id).Products;
        }

        private ProductsList GetOrderList(string id)
        {
            return this.orders.GetOrAdd(id, new ProductsList());
        }
    }
}