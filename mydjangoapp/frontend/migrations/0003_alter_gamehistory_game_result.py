# Generated by Django 5.0.6 on 2024-06-07 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_gamehistory_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamehistory',
            name='game_result',
            field=models.CharField(default='Nil', max_length=50),
        ),
    ]
