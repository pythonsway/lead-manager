# Generated by Django 3.0 on 2019-12-13 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0004_auto_20191213_2223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='group',
            field=models.CharField(choices=[('H', 'Home'), ('W', 'Work')], max_length=4),
        ),
    ]
