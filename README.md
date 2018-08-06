# Nebulas-Q

This application allows you to ask questions and get feedback from the audience in the form of voting. You can also vote for other people's questions.

![profile](https://github.com/tretetex/Nebulas-Q/blob/master/screen.png?raw=true)

## Smart Contract Instructions for Use

Smart contract provides methods:

- getMyPostsCount() - returns count of your posts
- getMyVotesCount() - returns the number of posts you have voted for
- getPost(id) - returns post by ID
- getPosts(startFrom, count) - returns the specified number of records (count), starting from the post with the ID equal to startFrom
- getTopPosts() - returns the posts sorted by votes
- getMyPosts() - returns posts created by you
- getUserPosts(wallet) - returns posts created by user
- addOrUpdate(postJson) - adds a new post or updates an existing
- remove(id) - deletes a post by ID
- vote(postId) - adds voice to post
- unvote(postId) - minus the voice of the post
- canVote(postId) - checks the possibility of voting for the post
- getPostsVotedFromMe() - returns the posts you voted for
