from django.contrib import admin
from django.urls import path,include
#prebuilt views for jwt token we make use of these views to get the access and refresh tokens for the users
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from api.views import CreateUserView

#we keep auth and register mainly separated hence we hav to make it different

#configure urls for our api
urlpatterns = [
    path('admin/', admin.site.urls),
    #call the view make allow to make user
    path("api/user/register/", CreateUserView.as_view(), name="register"),

    #get token
    path("api/token/",TokenObtainPairView.as_view(),name="token_token"),
    path("api/token/refresh/",TokenRefreshView.as_view(),name="refresh"),

    #prebuilt views for jwt token
    path("api-auth/",include('rest_framework.urls')),

    #link to the urls in the api directory
    #mainly it means api/ and not ones above takes remainer to the forward it to api/urls.py
    path('api/',include('api.urls')),
]

#make a link to reach urls in the api directory
