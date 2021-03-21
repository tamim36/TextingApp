using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Entities;

namespace DataManager.Configs
{
    public class MessageGroupConfig : IEntityTypeConfiguration<MessageGroup>
    {
        public void Configure(EntityTypeBuilder<MessageGroup> builder)
        {

            builder.HasKey(k => k.Id);
            builder.HasMany(m => m.TextMessages)
                    .WithOne(a => a.MessageGroup)
                    .HasForeignKey(m=>m.GroupId)
                    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
