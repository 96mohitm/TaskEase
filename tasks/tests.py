from django.test import TestCase
from .models import Task
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

class TaskModelTestCase(TestCase):

  def setUp(self):
    self.task_title = "Test Task"
    self.task = Task.objects.create(title=self.task_title)

  def test_task_creation(self):
    task = Task.objects.get(id=self.task.id)
    self.assertEqual(task.title, self.task_title)

class TaskViewTestCase(TestCase):

  def setUp(self):
    self.client = APIClient()
    self.task_data = {'title': 'Test Task'}
    self.response = self.client.post(
        reverse('task-list'),
        self.task_data,
        format="json"
    )

  def test_api_can_create_a_task(self):
    self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

  def test_api_can_get_a_task(self):
    task = Task.objects.get()
    response = self.client.get(
        reverse('task-detail', kwargs={'task_id': task.id}),
        format="json"
    )
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertContains(response, task)

  def test_api_can_update_task(self):
    task = Task.objects.get()
    change_task = {'title': 'Something new'}
    response = self.client.put(
        reverse('task-detail', kwargs={'task_id': task.id}),
        change_task, format='json'
    )
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_api_can_delete_task(self):
    task = Task.objects.get()
    response = self.client.delete(
        reverse('task-detail', kwargs={'task_id': task.id}),
        format='json', follow=True
    )
    self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

  def test_api_task_title_blank_error(self):
    """
    Test if creating a task with a blank title returns the expected error message.
    """
    response = self.client.post(
        reverse('task-list'),
        {'title': ''},
        format="json"
    )
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data, {'error': 'Title cannot be blank.'})

  def test_api_task_title_missing_error(self):
    """
    Test if creating a task without providing a title returns the expected error message.
    """
    response = self.client.post(
        reverse('task-list'),
        {},
        format="json"
    )
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data, {'error': 'Title is required.'})

  def test_api_task_invalid_status_error(self):
    """
    Test if creating a task with an invalid status returns the expected error message.
    """
    response = self.client.post(
        reverse('task-list'),
        {'title': 'Test Task', 'status': 'INVALID_STATUS'},
        format="json"
    )
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data, {'error': '"INVALID_STATUS" is not a valid choice.'})
