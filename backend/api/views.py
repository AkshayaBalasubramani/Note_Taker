from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny

from .serializers import UserSerializer,NoteSerializer
from .models import Note

# Create your views here.
#view to registration form

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #who can call this ie,any person who logs in can create a user
    permission_classes = [AllowAny]

#list all notes ans create a note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer

    #cant call the view unless u pass a valid jwt token
    permission_classes = [IsAuthenticated]

    #prebuilt methods are modified
    def get_queryset(self):
        user=self.request.user
    
        #all notes by specific user,cant view notes by diff user
        return Note.objects.filter(author=user)
    
    #we want to custom config,overwrite create method
    def perform_create(self, serializer):
        #overwrite create method to set the author of the note to the current user

        #tells if its valid accepted,serializer checks if data is valid
        #if valid new version of note additional field we add onto the note
        if serializer.is_valid():
            #save note
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    #prebuilt methods are modified
    #delete only the note created by the user
    def get_queryset(self):
        user=self.request.user
    
        #all notes by specific user,cant view notes by diff user
        return Note.objects.filter(author=user)
