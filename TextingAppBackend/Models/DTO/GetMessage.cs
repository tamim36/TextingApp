using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Models.Entities;

namespace Models.DTO
{
    public class GetMessage : IRequest<ICollection<MessageGroup>>
    {
        public int Id { get; set; }
    }
}
