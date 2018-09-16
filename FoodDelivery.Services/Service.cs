using FoodDelivery.Data;

namespace FoodDelivery.Services
{
    public abstract class Service
    {
        protected Service(FoodDeliveryDbContext database)
        {
            this.Database = database;
        }

        protected FoodDeliveryDbContext Database { get; }
    }
}