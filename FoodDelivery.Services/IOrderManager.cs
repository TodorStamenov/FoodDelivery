using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IOrderManager
    {
        void AddProduct(string id, Guid productId);

        void RemoveProduct(string id, Guid productId);

        void ClearProducts(string id);

        IEnumerable<Guid> GetProducts(string id);
    }
}