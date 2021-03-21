using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Models.DTO
{
    public class PersonDto : IRequest<PersonDto>
    {
        [Required]
        public string Mail { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public bool isSuccess { get; set; } = true;
    }
}
