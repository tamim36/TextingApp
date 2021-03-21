using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Models.Entities;
using Models.DTO;

namespace BSChat
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<PersonDto, Person>();
            CreateMap<CreateMessageGroup, MessageGroup>().ReverseMap();
            CreateMap<DeleteMessageGroup, MessageGroup>();
            CreateMap<DeleteSingleMessage, TextMessage>();
        }
    }
}
