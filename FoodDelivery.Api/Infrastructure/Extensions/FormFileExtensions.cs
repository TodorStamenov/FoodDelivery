using System.IO;
using System.Web;

namespace FoodDelivery.Api.Infrastructure.Extensions
{
    public static class FormFileExtensions
    {
        public static byte[] ToByteArray(this HttpPostedFileBase formFile)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                formFile.InputStream.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }

        public static byte[] ToByteArray(this HttpPostedFile formFile)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                formFile.InputStream.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}