from django.contrib.auth.models import User 
from rest_framework import serializers

from .models import Note

#serializere users orm(object relational mapping) maps python obj to code to make into db
#python code will handledb operations 
#json is used to communticating with frontend and rest api

#ui will give username and pw and return data and jwt
#serializer will convert data to json and send to frontend

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        #represtents a user
        model = User
        fields = ['id', 'username', 'password']
        #it tels django that we accepting but we are not gonna return it back .No one should see the password
        extra_kwargs = {'password': {'write_only': True}}

    #accept the serialized data valid uname and pw from serializer
    #dict to json
    def create(self, validated_data):
        #create a user with the given username and password
        user=User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at','author']

        #we should be able to read who the author but not overwrite it
        extra_kwargs = {'author': {'read_only': True}}

        
    
