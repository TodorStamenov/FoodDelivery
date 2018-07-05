using FoodDelivery.Data;

namespace FoodDelivery.Services
{
    public abstract class Service
    {
        protected readonly FoodDeliveryDbContext db;

        protected Service(FoodDeliveryDbContext db)
        {
            this.db = db;
        }
    }
}