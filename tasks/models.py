from django.db import models

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
  # Timestamps for record-keeping
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  # # To trace which user created or modified a task
  # created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks_created')
  # modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='tasks_modified')

  def __str__(self):
    return self.title
