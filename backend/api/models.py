from django.db import models
from django.contrib.auth.models import User

#python to json in db table
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    #we wont be passing
    created_at = models.DateTimeField(auto_now_add=True)

    #who made this note the foreign key links the user with data that belong to the user
    #1 user with many users(1 to many)
    #on delete cascade means if the user is deleted then all the notes created by that user will also be deleted
    #related name is used to access the notes of a user from the user model
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name='notes')

    def __str__(self):
        return self.title
    
