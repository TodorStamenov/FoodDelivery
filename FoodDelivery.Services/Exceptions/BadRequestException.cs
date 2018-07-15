using System;

namespace FoodDelivery.Services.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException()
            : this("400 Bad Request")
        {
        }

        public BadRequestException(string message)
            : base(message)
        {
        }
    }
}