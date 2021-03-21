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
    public class MessagesConfig : IEntityTypeConfiguration<TextMessage>
    {
        public void Configure(EntityTypeBuilder<TextMessage> builder)
        {
            builder.HasKey(k => k.Id);
            builder.HasOne(m => m.MessageGroup)
                .WithMany(t => t.TextMessages)
                .HasForeignKey(f => f.GroupId)
                .IsRequired();
        }
    }
}
