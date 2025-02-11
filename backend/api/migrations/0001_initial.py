# Generated by Django 5.0.7 on 2025-02-03 08:21

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=150, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('user', 'User')], default='user', max_length=50)),
                ('number_cyberpi', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='Cyberpi',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ip_address', models.CharField(max_length=150, unique=True)),
                ('status', models.CharField(default='offline', max_length=150)),
                ('registered_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cyberpis', to='api.user')),
            ],
            options={
                'db_table': 'cyberpis',
            },
        ),
    ]
