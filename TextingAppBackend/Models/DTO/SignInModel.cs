using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Models.DTO
{
    public class SignInModel : IRequest<TokenModel>
    {
        [Required]
        public string Mail { get; set; }
    }
}
