from django.db import models
from django.contrib.auth.models import User
from django.db.models.constraints import UniqueConstraint


class Tweets (models.Model):
    text = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    pub_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.text}"
    
    class Meta:
        ordering = ["-pub_date"]

class Like_or_dislike(models.Model):
    tweet = models.ForeignKey(Tweets, on_delete=models.CASCADE, related_name="like")
    like_by = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.like}"
    class Meta:
        unique_together = ["tweet", "like_by", "like"]

class Comment(models.Model):
    tweet = models.ForeignKey(Tweets, on_delete=models.CASCADE, related_name="comment")
    comment = models.CharField(max_length=150)
    comment_by = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_date = models.DateTimeField(auto_now=True)
    def __str_(self):
        return f"{self.comment}"

# class UsersAndTweets(models.Model):
#     name = models.ForeignKey(User, on_delete=models.CASCADE)
#     tweet = models.ForeignKey(Tweets, on_delete=models.CASCADE, related_name="owner")




