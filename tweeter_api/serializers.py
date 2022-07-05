from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Tweets, Comment, Like_or_dislike


class LikeDislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like_or_dislike
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        depth = 0

class CreateUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username", "password", "email")
        extra_kwargs = {"password":{"write_only":True}}


class TweetSerializer(serializers.ModelSerializer):
    like = LikeDislikeSerializer(many=True, read_only=True, required=False)
    comment = CommentSerializer(many=True, read_only=True, required=False)
    publish_date = serializers.DateTimeField(source="pub_date", format="%Y-%m-%d %H:%M:%S", read_only=True)
    username = serializers.CharField(source="created_by.username", read_only=True)# get the username from the foreign key which is the user model.
    class Meta:
        model = Tweets
        fields = "__all__"
        ordering = ["-publish_date"]
        # depth = 1     # to get all the extend values of the foreign key ( I love it )
       