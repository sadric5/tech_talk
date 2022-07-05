from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth.models import User

from .models import Tweets, Like_or_dislike, Comment
from .serializers import TweetSerializer, CommentSerializer, LikeDislikeSerializer, CreateUser


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweets.objects.all()
    serializer_class = TweetSerializer


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class LikeList(generics.ListCreateAPIView):
    queryset = Like_or_dislike.objects.all()
    serializer_class = LikeDislikeSerializer

class LikeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like_or_dislike.objects.all()
    serializer_class = LikeDislikeSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUser


