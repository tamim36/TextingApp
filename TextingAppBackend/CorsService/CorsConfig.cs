using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorsService
{
    public class CorsConfig:ICorsConfig 
    {
        public string AllowedHost { get; set; }
    }

    public interface ICorsConfig
    {
        public string AllowedHost { get; set; }
    }
}
