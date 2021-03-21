using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TokenService
{
    public class JwtSecrets : IJwtSecrets
    { 
        public string TokenSecrete { get; set; }
    }

    public interface IJwtSecrets
    {
        public string TokenSecrete { get; set; }
    }
}
