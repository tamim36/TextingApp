using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace Models.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string Mail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
