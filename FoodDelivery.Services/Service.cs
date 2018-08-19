using FoodDelivery.Data;
using System.Linq;

namespace FoodDelivery.Services
{
    public abstract class Service<T> : IService where T : class
    {
        protected Service(FoodDeliveryDbContext database)
        {
            this.Database = database;
        }

        protected FoodDeliveryDbContext Database { get; }

        public int GetTotalEntries()
        {
            return this.Database.Set<T>().Count();
        }
    }
}