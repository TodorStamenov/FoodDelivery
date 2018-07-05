using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(FoodDelivery.Api.Startup))]

namespace FoodDelivery.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}