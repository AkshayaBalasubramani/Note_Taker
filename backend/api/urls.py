from django.urls import path

# from .views import views
from .views import NoteListCreate, NoteDelete


urlpatterns=[
    #create a note and list all notes
    path("notes/", NoteListCreate.as_view(), name="note-list"),
    #int pk primary key
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note"),
]
