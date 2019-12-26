# Generated by Django 3.0 on 2019-12-13 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0003_lead_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='group',
            field=models.CharField(choices=[('H', 'Home'), ('W', 'Work')], default='W', max_length=4),
        ),
    ]
