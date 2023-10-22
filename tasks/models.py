from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
  STATUS_CHOICES = [
    ('TO_DO', 'To Do'),
    ('IN_PROGRESS', 'In Progress'),
    ('IN_REVIEW', 'In Review'),
    ('DONE', 'Done'),
  ]

  title = models.CharField(max_length=200, blank=False)
  description = models.TextField(blank=True, null=True)
  status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='TO_DO')
  due_date = models.DateField(null=True, blank=True)
  # Timestamps for record-keeping
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  # # To trace which user created or modified a task
  created_by = models.ForeignKey(User, related_name='created_tasks', on_delete=models.CASCADE)
  modified_by = models.ForeignKey(User, related_name='modified_tasks', on_delete=models.CASCADE, null=True, blank=True)

  def __str__(self):
    return self.title
